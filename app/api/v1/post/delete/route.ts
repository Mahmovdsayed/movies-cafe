import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const headers = request.headers;
    const url = process.env.DELETE_FAVS_BACKEND_URL || "";

    const res = await fetch(url, {
      method: "DELETE",
      headers: headers,
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(
      {
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
