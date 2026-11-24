export interface MetaUserData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  [key: string]: unknown;
}

export interface TrackMetaEventOptions {
  eventName: string;
  eventId?: string;
  userData?: MetaUserData;
  customData?: Record<string, unknown>;
}

// Global dataLayer declaration
declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/**
 * Helper to read a cookie value by name from document.cookie
 */
export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^|;\\s*)(" + name + ")=([^;]*)"));
  return match ? decodeURIComponent(match[3]) : null;
}

/**
 * Retrieves or initializes _fbc and _fbp cookies.
 * If fbclid is in the URL and _fbc does not exist, it creates and stores _fbc
 * with domain=.lottici.com.br for cross-subdomain tracking (ora and ares).
 */
export function resolveMetaCookies(): { fbp: string | null; fbc: string | null } {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return { fbp: null, fbc: null };
  }

  let fbp = getCookie("_fbp");
  let fbc = getCookie("_fbc");

  // Check URL parameters for fbclid
  try {
    const searchParams = new URLSearchParams(window.location.search);
    const fbclid = searchParams.get("fbclid");

    if (fbclid && !fbc) {
      const timestamp = Date.now();
      const generatedFbc = `fb.1.${timestamp}.${fbclid}`;
      const isLotticiDomain = window.location.hostname.includes("lottici.com.br");
      const domainAttr = isLotticiDomain ? "; domain=.lottici.com.br" : "";

      document.cookie = `_fbc=${generatedFbc}${domainAttr}; path=/; max-age=7776000; SameSite=Lax`;
      fbc = generatedFbc;
    }
  } catch (err) {
    console.warn("[Meta Tracking] Error parsing fbclid or setting _fbc:", err);
  }

  return { fbp, fbc };
}

/**
 * Dispatches an event simultaneously to Google Tag Manager (for Client-Side Meta Pixel)
 * and to /api/meta-capi (for Server-Side Meta Conversions API), with identical eventId for deduplication.
 */
export async function trackMetaEvent({
  eventName,
  eventId: providedEventId,
  userData = {},
  customData = {},
}: TrackMetaEventOptions): Promise<string> {
  if (typeof window === "undefined") return "";

  // 1. Generate unique event ID if not provided
  const eventId =
    providedEventId ||
    (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `ares_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`);

  // 2. Resolve cookies (_fbp and _fbc)
  const { fbp, fbc } = resolveMetaCookies();

  const lpSource = window.location.hostname || "ares.lottici.com.br";
  const eventSourceUrl = window.location.href;

  // 3. Push to Google Tag Manager (GTM dataLayer) with required keys for deduplication
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "meta_capi_event",
      meta_event_name: eventName,
      meta_event_id: eventId,
      lp_source: lpSource,
      user_data: userData,
      custom_data: customData,
    });
  } catch (err) {
    console.warn("[Meta Tracking] Error pushing to dataLayer:", err);
  }

  // 4. Send to server-side Meta Conversions API route
  try {
    fetch("/api/meta-capi", {
      method: "POST",
      keepalive: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventName,
        eventId,
        eventSourceUrl,
        lpSource,
        fbp,
        fbc,
        userData,
        customData,
      }),
    }).catch((err) => {
      console.warn("[Meta Tracking] Background CAPI fetch failed:", err);
    });
  } catch (err) {
    console.warn("[Meta Tracking] Error initiating CAPI fetch:", err);
  }

  return eventId;
}

/**
 * Tracks a WhatsApp conversion click (Contact event in Meta)
 */
export function trackWhatsAppClick(
  ctaName?: string,
  customData?: Record<string, unknown>,
  userData?: MetaUserData
): Promise<string> {
  return trackMetaEvent({
    eventName: "Contact",
    userData,
    customData: {
      content_name: ctaName || "WhatsApp CTA",
      channel: "WhatsApp",
      destination: "https://wa.me/5551992049182",
      ...customData,
    },
  });
}

/**
 * Tracks a form submission / lead capture (Lead event in Meta)
 */
export function trackLead(
  userData?: MetaUserData,
  customData?: Record<string, unknown>
): Promise<string> {
  return trackMetaEvent({
    eventName: "Lead",
    userData,
    customData: {
      content_name: "Formulário de Contato / Lead",
      ...customData,
    },
  });
}
