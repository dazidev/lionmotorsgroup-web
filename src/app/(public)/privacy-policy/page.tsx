import { Footer } from "@/src/components";
import { FaAngleDown } from "react-icons/fa";

export default async function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col w-full pt-20">
      <main className="flex justify-center w-full">
        <div className="flex flex-col sm:w-[1350px] py-10 px-10 text-xl gap-2">
          <h1 className="text-4xl font-bold">
            Privacy Policy of Lion Motors Group
          </h1>

          <span className="font-bold">Last updated: June 4, 2026</span>

          <p>
            At Lion Motors Group, we respect the privacy of our visitors and
            customers. This Privacy Policy explains what information we collect
            through our website, how we use it, with whom we may share it, and
            what choices you have regarding your personal information.
          </p>

          <p>
            By using our website or submitting information through our forms,
            you agree to the practices described in this Privacy Policy.
          </p>

          <div className="flex flex-col w-full pt-5 gap-2">
            <details className="group border-b border-b-white py-4">
              <summary className="flex flex-row justify-between items-center hover:cursor-pointer list-none">
                <span className="font-semibold">1. Information We Collect</span>
                <FaAngleDown className="text-2xl transition-transform duration-300 group-open:rotate-180" />
              </summary>

              <div className="flex flex-col text-left py-5 gap-5">
                <p>
                  Lion Motors Group may collect personal information that you
                  voluntarily provide when completing forms on our website,
                  including forms used to check vehicle availability or to
                  contact our company.
                </p>

                <p>The information we may collect includes:</p>

                <div className="pl-10">
                  <ul className="list-disc">
                    <li>First name.</li>
                    <li>Last name.</li>
                    <li>Email address.</li>
                    <li>ZIP code.</li>
                    <li>Phone number.</li>
                    <li>Comments, messages, or requests submitted by you.</li>
                    <li>Vehicle of interest, when applicable.</li>
                  </ul>
                </div>

                <p>
                  We may also collect basic technical information related to
                  your use of our website, such as your IP address, browser
                  type, device information, pages visited, and data collected
                  through cookies or similar technologies, if such tools are
                  enabled on our website.
                </p>
              </div>
            </details>

            <details className="group border-b border-b-white py-4">
              <summary className="flex flex-row justify-between items-center hover:cursor-pointer list-none">
                <span className="font-semibold">
                  2. How We Use Your Information
                </span>
                <FaAngleDown className="text-2xl transition-transform duration-300 group-open:rotate-180" />
              </summary>

              <div className="flex flex-col text-left py-5 gap-5">
                <p>
                  We use the information we collect for the following purposes:
                </p>

                <div className="pl-10">
                  <ul className="list-disc">
                    <li>
                      To respond to your questions, messages, or requests.
                    </li>
                    <li>To check or confirm vehicle availability.</li>
                    <li>To contact you by phone, text message, or email.</li>
                    <li>
                      To follow up regarding your interest in a vehicle or
                      service.
                    </li>
                    <li>
                      To provide information about vehicles, promotions,
                      services, or updates from Lion Motors Group.
                    </li>
                    <li>
                      To send commercial or marketing communications related to
                      our company.
                    </li>
                    <li>
                      To improve customer service and the website user
                      experience.
                    </li>
                    <li>To comply with legal obligations, when applicable.</li>
                  </ul>
                </div>
              </div>
            </details>

            <details className="group border-b border-b-white py-4">
              <summary className="flex flex-row justify-between items-center hover:cursor-pointer list-none">
                <span className="font-semibold">
                  3. Communications, Calls, Text Messages, and Marketing
                </span>
                <FaAngleDown className="text-2xl transition-transform duration-300 group-open:rotate-180" />
              </summary>

              <div className="flex flex-col text-left py-5 gap-5">
                <p>
                  By submitting a form on our website, you agree that Lion
                  Motors Group may contact you by phone, text message, or email
                  regarding your inquiry, vehicle availability, services,
                  promotions, or marketing communications.
                </p>

                <p>
                  Message and data rates may apply depending on your mobile
                  carrier.
                </p>

                <p>
                  You may opt out of receiving marketing communications at any
                  time by following the instructions included in our
                  communications or by contacting us directly.
                </p>
              </div>
            </details>

            <details className="group border-b border-b-white py-4">
              <summary className="flex flex-row justify-between items-center hover:cursor-pointer list-none">
                <span className="font-semibold">
                  4. Contact and Vehicle Availability Forms
                </span>
                <FaAngleDown className="text-2xl transition-transform duration-300 group-open:rotate-180" />
              </summary>

              <div className="flex flex-col text-left py-5 gap-5">
                <p>Our website includes forms intended to:</p>

                <div className="pl-10">
                  <ul className="list-disc">
                    <li>Check the availability of a vehicle.</li>
                    <li>
                      Send a general contact request to Lion Motors Group.
                    </li>
                  </ul>
                </div>

                <p>
                  Information submitted through these forms is used only to
                  contact the user, respond to the request, provide information
                  about vehicles or services, and send communications related to
                  Lion Motors Group.
                </p>
              </div>
            </details>

            <details className="group border-b border-b-white py-4">
              <summary className="flex flex-row justify-between items-center hover:cursor-pointer list-none">
                <span className="font-semibold">
                  5. Third-Party Financing Link
                </span>
                <FaAngleDown className="text-2xl transition-transform duration-300 group-open:rotate-180" />
              </summary>

              <div className="flex flex-col text-left py-5 gap-5">
                <p>
                  Our website may include a button or link to apply for
                  financing, such as “Apply for Financing”.
                </p>

                <p>
                  When you click this button, you may be redirected to an
                  external financing website that is not owned, operated, or
                  controlled by Lion Motors Group.
                </p>

                <p>
                  Any personal, financial, credit-related, or other information
                  you provide on that external website will be collected and
                  processed by that third party according to its own privacy
                  policy and terms of use.
                </p>

                <p>
                  Lion Motors Group is not responsible for the privacy
                  practices, security, content, data handling, or operation of
                  third-party websites.
                </p>

                <p>
                  We recommend that you review the privacy policy of the
                  external website before submitting any personal or financial
                  information.
                </p>
              </div>
            </details>

            <details className="group border-b border-b-white py-4">
              <summary className="flex flex-row justify-between items-center hover:cursor-pointer list-none">
                <span className="font-semibold">6. Financial Information</span>
                <FaAngleDown className="text-2xl transition-transform duration-300 group-open:rotate-180" />
              </summary>

              <div className="flex flex-col text-left py-5 gap-5">
                <p>
                  Lion Motors Group does not directly collect sensitive
                  financial information through its contact or vehicle
                  availability forms, such as:
                </p>

                <div className="pl-10">
                  <ul className="list-disc">
                    <li>Social Security Number.</li>
                    <li>Credit history.</li>
                    <li>Credit score.</li>
                    <li>Bank account information.</li>
                    <li>Income information.</li>
                    <li>Employment information.</li>
                    <li>Complete credit or financing applications.</li>
                  </ul>
                </div>

                <p>
                  Any financing-related information may be requested only by the
                  external website to which you are redirected and will be
                  subject to that third party’s own privacy policy.
                </p>
              </div>
            </details>

            <details className="group border-b border-b-white py-4">
              <summary className="flex flex-row justify-between items-center hover:cursor-pointer list-none">
                <span className="font-semibold">
                  7. How We Share Your Information
                </span>
                <FaAngleDown className="text-2xl transition-transform duration-300 group-open:rotate-180" />
              </summary>

              <div className="flex flex-col text-left py-5 gap-5">
                <p>
                  Lion Motors Group does not sell your personal information.
                </p>

                <p>
                  We may share personal information only when necessary to
                  operate our website, respond to requests, or provide our
                  services. This may include sharing information with:
                </p>

                <div className="pl-10">
                  <ul className="list-disc">
                    <li>Website hosting or maintenance providers.</li>
                    <li>Email or communication service providers.</li>
                    <li>Web analytics or advertising tools, if used.</li>
                    <li>Internal customer management systems.</li>
                    <li>
                      Legal or government authorities, when required by law.
                    </li>
                  </ul>
                </div>

                <p>
                  These third parties should only use the information for the
                  purposes for which it was shared and in accordance with their
                  own privacy and security obligations.
                </p>
              </div>
            </details>

            <details className="group border-b border-b-white py-4">
              <summary className="flex flex-row justify-between items-center hover:cursor-pointer list-none">
                <span className="font-semibold">
                  8. Cookies and Similar Technologies
                </span>
                <FaAngleDown className="text-2xl transition-transform duration-300 group-open:rotate-180" />
              </summary>

              <div className="flex flex-col text-left py-5 gap-5">
                <p>
                  Our website may use cookies or similar technologies to improve
                  the user experience, analyze website traffic, remember
                  preferences, and support advertising or marketing activities.
                </p>

                <p>
                  You can configure your browser to reject or delete cookies.
                  However, some website features may not function properly if
                  cookies are disabled.
                </p>
              </div>
            </details>

            <details className="group border-b border-b-white py-4">
              <summary className="flex flex-row justify-between items-center hover:cursor-pointer list-none">
                <span className="font-semibold">9. Data Security</span>
                <FaAngleDown className="text-2xl transition-transform duration-300 group-open:rotate-180" />
              </summary>

              <div className="flex flex-col text-left py-5 gap-5">
                <p>
                  Lion Motors Group takes reasonable measures to protect
                  personal information against unauthorized access, loss,
                  misuse, alteration, or unauthorized disclosure.
                </p>

                <p>
                  These measures may include the use of secure connections,
                  restricted access to information, and trusted technology
                  providers.
                </p>

                <p>
                  However, no method of Internet transmission or electronic
                  storage is completely secure, so we cannot guarantee absolute
                  security.
                </p>
              </div>
            </details>

            <details className="group border-b border-b-white py-4">
              <summary className="flex flex-row justify-between items-center hover:cursor-pointer list-none">
                <span className="font-semibold">10. Data Retention</span>
                <FaAngleDown className="text-2xl transition-transform duration-300 group-open:rotate-180" />
              </summary>

              <div className="flex flex-col text-left py-5 gap-5">
                <p>
                  We retain personal information for as long as necessary to
                  fulfill the purposes described in this Privacy Policy, respond
                  to requests, maintain business records, comply with legal
                  obligations, and resolve potential disputes.
                </p>

                <p>
                  When the information is no longer needed, we may delete or
                  anonymize it according to our internal practices.
                </p>
              </div>
            </details>

            <details className="group border-b border-b-white py-4">
              <summary className="flex flex-row justify-between items-center hover:cursor-pointer list-none">
                <span className="font-semibold">
                  11. Your Choices and Rights
                </span>
                <FaAngleDown className="text-2xl transition-transform duration-300 group-open:rotate-180" />
              </summary>

              <div className="flex flex-col text-left py-5 gap-5">
                <p>You may contact us to:</p>

                <div className="pl-10">
                  <ul className="list-disc">
                    <li>
                      Request information about the personal data we have about
                      you.
                    </li>
                    <li>Correct inaccurate or outdated information.</li>
                    <li>
                      Request that we stop sending you marketing communications.
                    </li>
                    <li>
                      Request deletion of your information, when legally and
                      technically possible.
                    </li>
                  </ul>
                </div>

                <p>
                  To exercise these choices, you may contact us using the
                  contact information provided at the end of this Privacy
                  Policy.
                </p>
              </div>
            </details>

            <details className="group border-b border-b-white py-4">
              <summary className="flex flex-row justify-between items-center hover:cursor-pointer list-none">
                <span className="font-semibold">12. Children’s Privacy</span>
                <FaAngleDown className="text-2xl transition-transform duration-300 group-open:rotate-180" />
              </summary>

              <div className="flex flex-col text-left py-5 gap-5">
                <p>
                  Our website is not directed to children under the age of 13.
                  We do not knowingly collect personal information from
                  children.
                </p>

                <p>
                  If we discover that we have collected personal information
                  from a child without proper consent, we will take reasonable
                  steps to delete such information.
                </p>
              </div>
            </details>

            <details className="group border-b border-b-white py-4">
              <summary className="flex flex-row justify-between items-center hover:cursor-pointer list-none">
                <span className="font-semibold">
                  13. Links to Third-Party Websites
                </span>
                <FaAngleDown className="text-2xl transition-transform duration-300 group-open:rotate-180" />
              </summary>

              <div className="flex flex-col text-left py-5 gap-5">
                <p>
                  Our website may contain links to third-party websites,
                  including financing websites, social media platforms, external
                  tools, or other services.
                </p>

                <p>
                  We do not control these external websites and are not
                  responsible for their privacy practices, content, or security.
                  We recommend that you review the privacy policies of any
                  external website you visit.
                </p>
              </div>
            </details>

            <details className="group border-b border-b-white py-4">
              <summary className="flex flex-row justify-between items-center hover:cursor-pointer list-none">
                <span className="font-semibold">
                  14. Changes to This Privacy Policy
                </span>
                <FaAngleDown className="text-2xl transition-transform duration-300 group-open:rotate-180" />
              </summary>

              <div className="flex flex-col text-left py-5 gap-5">
                <p>
                  Lion Motors Group may update this Privacy Policy from time to
                  time. When we make changes, we will update the “Last updated”
                  date at the top of this page.
                </p>

                <p>
                  Your continued use of the website after any changes are posted
                  means that you accept the updated Privacy Policy.
                </p>
              </div>
            </details>

            <details className="group border-b border-b-white py-4">
              <summary className="flex flex-row justify-between items-center hover:cursor-pointer list-none">
                <span className="font-semibold">15. Contact Us</span>
                <FaAngleDown className="text-2xl transition-transform duration-300 group-open:rotate-180" />
              </summary>

              <div className="flex flex-col text-left py-5 gap-5">
                <p>
                  If you have any questions about this Privacy Policy or how we
                  handle your personal information, you may contact us at:
                </p>

                <div className="flex flex-col gap-1">
                  <span className="font-bold">Lion Motors Group</span>
                  <span>Address: 7 Donaldson Rd, Greenville, SC 29605</span>
                  <span>Phone: </span>
                  <span>Email: </span>
                </div>
              </div>
            </details>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
