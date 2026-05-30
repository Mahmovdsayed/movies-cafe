import { checkAvailability } from "@/lib/vidapi.service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const type = (searchParams.get("type") as "movie" | "tv") ?? "movie";

  if (!id) {
    return NextResponse.json({ available: false }, { status: 400 });
  }

  try {
    const available = await checkAvailability(id, type);
    return NextResponse.json(
      { available },
      {
        headers: {
          // Cache 1h in browser/CDN — list is updated daily on VidAPI side
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
        },
      }
    );
  } catch {
    return NextResponse.json({ available: false });
  }
}
