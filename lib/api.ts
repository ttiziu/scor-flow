const getApiUrl = () =>
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export interface GenerateSpecResponse {
  projectName: string;
  description: string;
  stack: string;
  architecture: string[];
  folderStructure: string[];
  roadmap: string[];
  userActions: string[];
  clarificationRequested?: boolean;
  clarificationMessage?: string;
}

export interface GeneratedFile {
  path: string;
  content: string;
}

export interface GenerateCodeResponse {
  files: GeneratedFile[];
}

export async function generateSpec(idea: string): Promise<GenerateSpecResponse> {
  const res = await fetch(`${getApiUrl()}/ai/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idea }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { message?: string }).message || res.statusText);
  }
  return res.json();
}

export async function generateCode(
  idea: string,
  spec?: GenerateSpecResponse | null
): Promise<GenerateCodeResponse> {
  const res = await fetch(`${getApiUrl()}/ai/generate-code`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idea, spec: spec ?? undefined }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { message?: string }).message || res.statusText);
  }
  return res.json();
}
