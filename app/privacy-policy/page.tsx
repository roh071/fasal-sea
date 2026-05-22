import type { Metadata } from "next";
import { SectionContainer } from "@/components/shared/SectionContainer";

export const metadata: Metadata = {
  title: "Privacy Policy | Fasal SEA",
  description:
    "Fasal SEA privacy policy — how we collect, use, and protect your personal data. Compliant with Malaysia's PDPA and the Philippines Data Privacy Act 2012.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="bg-[#fafaf9] border-b border-[#e7e5e4]">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#1c1917] mb-3">Privacy Policy</h1>
          <p className="text-sm text-[#78716c]">Last updated: May 2025. Effective date: May 2025.</p>
        </div>
      </section>

      <SectionContainer>
        <div className="max-w-3xl mx-auto prose prose-sm prose-stone">
          <div className="space-y-8 text-[#44403c] text-sm leading-relaxed">

            <section>
              <h2 className="text-lg font-bold text-[#1c1917] mb-3">1. Who We Are</h2>
              <p>
                This website (<strong>fasalsea.com</strong> or the domain at which you accessed this page) is operated by <strong>Wolkus Technology Solutions Pvt. Ltd.</strong> (&quot;Fasal&quot;, &quot;we&quot;, &quot;us&quot;, &quot;our&quot;), a company incorporated under the laws of India with its registered office at Bengaluru, Karnataka, India.
              </p>
              <p className="mt-3">
                This website serves potential enterprise customers and distributors in <strong>Malaysia</strong> and the <strong>Philippines</strong>. We are committed to protecting your personal data in compliance with:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Malaysia — <strong>Personal Data Protection Act 2010 (PDPA)</strong></li>
                <li>Philippines — <strong>Republic Act No. 10173 (Data Privacy Act 2012)</strong> and its Implementing Rules and Regulations</li>
                <li>India — <strong>Digital Personal Data Protection Act 2023 (DPDPA)</strong></li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#1c1917] mb-3">2. What Personal Data We Collect</h2>
              <p>We collect personal data only when you voluntarily submit it through our lead capture forms. Depending on the form submitted, this may include:</p>
              <div className="mt-4 rounded-xl border border-[#e7e5e4] overflow-hidden">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-[#fafaf9]">
                      <th className="text-left px-4 py-2.5 font-semibold text-[#1c1917] border-b border-[#e7e5e4]">Data Element</th>
                      <th className="text-left px-4 py-2.5 font-semibold text-[#1c1917] border-b border-[#e7e5e4]">Form(s)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Full name / First & Last name", "Enterprise & Distributor"],
                      ["Work email address", "Enterprise & Distributor"],
                      ["Phone number (with country code)", "Distributor"],
                      ["Job title", "Enterprise"],
                      ["Company / estate name", "Enterprise & Distributor"],
                      ["Country of operation", "Enterprise & Distributor"],
                      ["Primary crops", "Enterprise"],
                      ["Farm / estate area (ha)", "Enterprise"],
                      ["Business type & farmer network size", "Distributor"],
                      ["Budget range", "Distributor"],
                      ["Optional: biggest challenge, referral source, message", "Enterprise & Distributor"],
                    ].map(([data, form]) => (
                      <tr key={data} className="border-b border-[#e7e5e4] last:border-0">
                        <td className="px-4 py-2.5">{data}</td>
                        <td className="px-4 py-2.5 text-[#78716c]">{form}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-3">We do <strong>not</strong> collect any special categories of personal data (health, biometric, financial account data, etc.).</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#1c1917] mb-3">3. How We Use Your Personal Data</h2>
              <p>We use your data for the following purposes:</p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li><strong>Sales follow-up:</strong> To contact you about Fasal products and services relevant to your enquiry, and to assess whether there is a potential commercial fit.</li>
                <li><strong>Communication:</strong> To respond to questions you raise through the contact form or lead forms.</li>
                <li><strong>Internal records:</strong> To maintain accurate records of lead enquiries for our business development team.</li>
              </ul>
              <p className="mt-3">We do <strong>not</strong> use your data for automated decision-making, profiling for advertising, or sale to third parties.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#1c1917] mb-3">4. Legal Basis for Processing</h2>
              <p>We rely on the following legal bases to process your personal data:</p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li><strong>Consent:</strong> You provide explicit consent by ticking the consent checkbox on our forms before submitting. You may withdraw consent at any time (see Section 8).</li>
                <li><strong>Legitimate interests:</strong> Processing is necessary for our legitimate interest in responding to business enquiries and developing our commercial presence in SEA markets.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#1c1917] mb-3">5. Data Storage and Security</h2>
              <p>
                When you submit a form, your data is transmitted via <strong>Resend</strong> (a US-based transactional email API provider) to our internal business development team. We do not maintain a public-facing database of lead submissions — data is handled as email correspondence within our internal systems.
              </p>
              <p className="mt-3">
                Resend processes data under their privacy policy and standard data processing agreements. Form submissions are transmitted over encrypted HTTPS connections.
              </p>
              <p className="mt-3">
                We retain personal data for as long as necessary to pursue the purposes described in Section 3, or until you withdraw consent. Typically this means until a commercial relationship is established or until you request deletion.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#1c1917] mb-3">6. Data Sharing</h2>
              <p>We do not sell your personal data. We may share it with:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Fasal / Wolkus internal teams</strong> — for sales follow-up and account management.</li>
                <li><strong>Resend</strong> — email delivery service provider (data processor, not data controller).</li>
                <li><strong>Legal or regulatory authorities</strong> — only where required by applicable law.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#1c1917] mb-3">7. International Data Transfers</h2>
              <p>
                Your data may be transferred to and processed in India, where Wolkus Technology Solutions is headquartered. India has been designated as having adequate data protection standards by applicable frameworks. All transfers are conducted with appropriate safeguards in place.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#1c1917] mb-3">8. Your Rights</h2>
              <p>Under applicable data protection laws, you have the following rights:</p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
                <li><strong>Correction:</strong> Request correction of inaccurate data.</li>
                <li><strong>Erasure / deletion:</strong> Request deletion of your personal data.</li>
                <li><strong>Withdraw consent:</strong> Withdraw consent for processing at any time (without affecting the lawfulness of prior processing).</li>
                <li><strong>Data portability:</strong> Request a machine-readable copy of your data where technically feasible.</li>
                <li><strong>Objection:</strong> Object to processing based on legitimate interests.</li>
              </ul>
              <p className="mt-3">
                To exercise any of these rights, contact us at <a href="mailto:rohan.sharma@wolkus.com" className="text-[#16a34a] underline">rohan.sharma@wolkus.com</a>. We will respond within 30 days.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#1c1917] mb-3">9. Cookies and Analytics</h2>
              <p>
                This website does not currently use cookies for analytics or advertising purposes. If analytics or marketing tools are added in future, this policy will be updated and a cookie consent mechanism will be added prior to deployment.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#1c1917] mb-3">10. Children&apos;s Data</h2>
              <p>
                This website is directed at business professionals and is not intended for individuals under the age of 18. We do not knowingly collect personal data from minors.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#1c1917] mb-3">11. Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. The &quot;last updated&quot; date at the top of this page reflects when material changes were made. Continued use of the website after updates constitutes acceptance of the revised policy.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-[#1c1917] mb-3">12. Contact Us</h2>
              <div className="rounded-xl bg-[#fafaf9] border border-[#e7e5e4] p-5">
                <p className="font-semibold text-[#1c1917]">Data Controller</p>
                <p className="mt-1">Wolkus Technology Solutions Pvt. Ltd.</p>
                <p>Bengaluru, Karnataka, India</p>
                <p className="mt-2">
                  Privacy enquiries: <a href="mailto:rohan.sharma@wolkus.com" className="text-[#16a34a] underline">rohan.sharma@wolkus.com</a>
                </p>
              </div>
              <p className="mt-3 text-xs text-[#78716c]">
                If you are based in Malaysia and believe your PDPA rights have not been met, you may lodge a complaint with the Department of Personal Data Protection (JPDP) at <strong>pdp.gov.my</strong>. If you are in the Philippines, you may contact the National Privacy Commission (NPC) at <strong>privacy.gov.ph</strong>.
              </p>
            </section>

          </div>
        </div>
      </SectionContainer>
    </>
  );
}
