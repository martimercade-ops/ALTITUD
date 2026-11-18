interface ApiFailure {
  error: {
    code: string;
    message: string;
    issues?: { path: string; message: string }[];
  };
}

export class ApiClientError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "ApiClientError";
  }
}

export async function apiFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(path, {
    ...init,
    headers: { "content-type": "application/json", ...init?.headers },
  });

  const body = (await res.json().catch(() => null)) as
    | { data: T }
    | ApiFailure
    | null;

  if (!res.ok || !body || "error" in body) {
    const err =
      body && "error" in body
        ? body.error
        : { code: "request_failed", message: "Request failed." };
    throw new ApiClientError(err.code, err.message, res.status);
  }

  return body.data;
}
