/**
 * Submit a form to Netlify Forms from a client component.
 * The form must be declared statically in public/__forms.html so Netlify's
 * build-time detection registers it; we then POST url-encoded data to that file.
 */
export async function submitNetlifyForm(formName: string, data: Record<string, string>) {
  const body = new URLSearchParams({ "form-name": formName, ...data }).toString();
  const res = await fetch("/__forms.html", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) {
    throw new Error(`Form submission failed (${res.status})`);
  }
}
