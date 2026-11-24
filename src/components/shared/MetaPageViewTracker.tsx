"use client";

import { useEffect, useRef } from "react";
import { trackMetaEvent } from "@/lib/meta-tracking";

/**
 * Automatically fires a deduplicated PageView event to GTM and Meta CAPI on mount.
 * Protected against double firing in React StrictMode.
 */
export default function MetaPageViewTracker() {
  const hasFired = useRef(false);

  useEffect(() => {
    if (hasFired.current) return;
    hasFired.current = true;

    trackMetaEvent({
      eventName: "PageView",
    });
  }, []);

  return null;
}
