import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

interface UserDataInput {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  [key: string]: unknown;
}

interface RequestBody {
  eventName?: string;
  eventId?: string;
  eventSourceUrl?: string;
  lpSource?: string;
  fbp?: string;
  fbc?: string;
  userData?: UserDataInput;
  customData?: Record<string, unknown>;
}

function hashValue(value?: string | null): string | undefined {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase();
  if (!normalized) return undefined;
  return crypto.createHash("sha256").update(normalized).digest("hex");
}

function normalizeAndHashPhone(phone?: string | null): string | undefined {
  if (!phone) return undefined;
  let digits = phone.replace(/\D/g, "");
  if (!digits) return undefined;
  // Automatically prepend Brazilian DDI 55 if phone has 10 or 11 digits
  if (digits.length === 10 || digits.length === 11) {
    digits = "55" + digits;
  }
  return crypto.createHash("sha256").update(digits).digest("hex");
}

export async function POST(req: NextRequest) {
  try {
    const pixelId = process.env.META_PIXEL_ID;
    const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
    const testEventCode = process.env.META_TEST_EVENT_CODE;

    // Graceful error if environment variables are not configured
    if (!pixelId || !accessToken) {
      console.warn(
        "[Meta CAPI] META_PIXEL_ID or META_CAPI_ACCESS_TOKEN not configured. Skipping server-side dispatch."
      );
      return NextResponse.json(
        {
          success: false,
          message: "Meta CAPI credentials not configured in environment variables",
        },
        { status: 200 }
      );
    }

    const body: RequestBody = await req.json().catch(() => ({}));
    const {
      eventName,
      eventId,
      eventSourceUrl,
      lpSource,
      fbp,
      fbc,
      userData = {},
      customData = {},
    } = body;

    if (!eventName || !eventId) {
      return NextResponse.json(
        { success: false, message: "eventName and eventId are required" },
        { status: 400 }
      );
    }

    // 1. Capture Client IP (unhashed)
    const forwardedFor = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const clientIpAddress = forwardedFor
      ? forwardedFor.split(",")[0].trim()
      : realIp?.trim() || undefined;

    // 2. Capture Client User Agent (unhashed)
    const clientUserAgent = req.headers.get("user-agent") || undefined;

    // 3. Capture _fbp and _fbc: prioritize cookies, fallback to body
    const cookieFbp = req.cookies.get("_fbp")?.value;
    const cookieFbc = req.cookies.get("_fbc")?.value;
    const resolvedFbp = cookieFbp || fbp || undefined;
    const resolvedFbc = cookieFbc || fbc || undefined;

    // 4. Normalize & SHA-256 hash personal identifiers
    const hashedEmail = hashValue(userData.email);
    const hashedPhone = normalizeAndHashPhone(userData.phone);
    const hashedFirstName = hashValue(userData.firstName);
    const hashedLastName = hashValue(userData.lastName);

    // 5. Construct Meta CAPI Payload
    const metaUserData: Record<string, unknown> = {
      client_ip_address: clientIpAddress,
      client_user_agent: clientUserAgent,
    };

    if (resolvedFbp) metaUserData.fbp = resolvedFbp;
    if (resolvedFbc) metaUserData.fbc = resolvedFbc;
    if (hashedEmail) metaUserData.em = hashedEmail;
    if (hashedPhone) metaUserData.ph = hashedPhone;
    if (hashedFirstName) metaUserData.fn = hashedFirstName;
    if (hashedLastName) metaUserData.ln = hashedLastName;

    const payloadData: Record<string, unknown> = {
      event_name: eventName,
      event_time: Math.floor(Date.now() / 1000),
      event_id: eventId,
      event_source_url:
        eventSourceUrl || req.headers.get("referer") || "https://ares.lottici.com.br",
      action_source: "website",
      user_data: metaUserData,
      custom_data: {
        ...customData,
        lp_source: lpSource || "ares.lottici.com.br",
      },
    };

    const payload: Record<string, unknown> = {
      data: [payloadData],
    };

    if (testEventCode) {
      payload.test_event_code = testEventCode;
    }

    // 6. Send event to Meta Graph API v21.0
    const metaApiUrl = `https://graph.facebook.com/v21.0/${pixelId}/events?access_token=${encodeURIComponent(
      accessToken
    )}`;

    const response = await fetch(metaApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      console.error("[Meta CAPI Error Response]:", result);
      return NextResponse.json(
        {
          success: false,
          error: result,
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      events_received: result.events_received ?? 1,
      fbtrace_id: result.fbtrace_id,
    });
  } catch (error) {
    console.error("[Meta CAPI Exception]:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
