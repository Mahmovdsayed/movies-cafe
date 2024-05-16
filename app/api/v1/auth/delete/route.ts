import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  try {
    const headers = request.headers;
    const url = process.env.DELETE_ACCOUNT_URL || "";

    const res = await fetch(url, {
      method: "DELETE",
      headers: headers,
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
