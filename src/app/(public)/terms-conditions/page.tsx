import { Footer } from "@/src/components";
import { FaAngleDown } from "react-icons/fa";

export default async function TermsAndConditionsPage() {
  return (
    <div className="flex flex-col w-full pt-20">
      <main className="flex justify-center w-full">
        <div className="flex flex-col w-full max-w-[1350px] py-10 px-10 text-xl gap-2">
          <h1 className="text-4xl font-bold">
            Terms and Conditions of Lion Motors Group
          </h1>

          <span className="font-bold">Last updated: June 4, 2026</span>

          <p>
            Welcome to the website of Lion Motors Group. These Terms and
            Conditions govern your access to and use of our website, including
            vehicle information, contact forms, vehicle availability requests,
            external links, and any other features available on the website.
          </p>

          <p>
            By accessing or using this website, you agree to these Terms and
            Conditions. If you do not agree with them, we recommend that you do
            not use this website.
          </p>

          <div className="flex flex-col w-full pt-5 gap-2">
            <details className="group border-b border-b-white py-4">
              <summary className="flex flex-row justify-between items-center hover:cursor-pointer list-none">
                <span className="font-semibold">1. General Information</span>
                <FaAngleDown className="text-2xl transition-transform duration-300 group-open:rotate-180" />
              </summary>

              <div className="flex flex-col text-left py-5 gap-5">
                <p>
                  This website is operated by Lion Motors Group, located at:
                </p>

                <div className="flex flex-col gap-1">
                  <span className="font-bold">Lion Motors Group</span>
                  <span>Address: 7 Donaldson Rd, Greenville, SC 29605</span>
                  <span>Phone: </span>
                  <span>Email: </span>
                </div>

                <p>
                  The main purpose of this website is to provide information
                  about vehicles, services, contact options, vehicle
                  availability, and financing-related options through external
                  links.
                </p>
              </div>
            </details>

            <details className="group border-b border-b-white py-4">
              <summary className="flex flex-row justify-between items-center hover:cursor-pointer list-none">
                <span className="font-semibold">2. Use of the Website</span>
                <FaAngleDown className="text-2xl transition-transform duration-300 group-open:rotate-180" />
              </summary>

              <div className="flex flex-col text-left py-5 gap-5">
                <p>
                  You agree to use this website only for lawful purposes and in
                  accordance with these Terms and Conditions.
                </p>

                <p>By using our website, you agree not to:</p>

                <div className="pl-10">
                  <ul className="list-disc">
                    <li>
                      Use the website for fraudulent, illegal, or unauthorized
                      purposes.
                    </li>
                    <li>
                      Submit false, incomplete, misleading, or unauthorized
                      third-party information.
                    </li>
                    <li>
                      Attempt to gain unauthorized access to systems, servers,
                      or databases.
                    </li>
                    <li>Interfere with the normal operation of the website.</li>
                    <li>
                      Use the website to send spam, malware, or harmful content.
                    </li>
                    <li>
                      Copy, modify, or use website content without prior
                      authorization.
                    </li>
                  </ul>
                </div>

                <p>
                  Lion Motors Group reserves the right to restrict or block
                  access to the website if we believe it is being misused.
                </p>
              </div>
            </details>

            <details className="group border-b border-b-white py-4">
              <summary className="flex flex-row justify-between items-center hover:cursor-pointer list-none">
                <span className="font-semibold">3. Vehicle Information</span>
                <FaAngleDown className="text-2xl transition-transform duration-300 group-open:rotate-180" />
              </summary>

              <div className="flex flex-col text-left py-5 gap-5">
                <p>
                  Information published about vehicles, including images,
                  features, prices, mileage, availability, promotions, or any
                  other details, is provided for informational purposes only.
                </p>

                <p>
                  Although we try to keep information updated and accurate, Lion
                  Motors Group does not guarantee that all information published
                  on the website will always be free from errors, omissions, or
                  outdated details.
                </p>

                <p>
                  Vehicle availability may change without notice. A vehicle
                  shown on the website may have been sold, reserved, removed
                  from inventory, or may no longer be available at the time of
                  your inquiry.
                </p>

                <p>
                  To confirm vehicle availability, price, features, or
                  conditions, you should contact Lion Motors Group directly.
                </p>
              </div>
            </details>

            <details className="group border-b border-b-white py-4">
              <summary className="flex flex-row justify-between items-center hover:cursor-pointer list-none">
                <span className="font-semibold">
                  4. Prices, Promotions, and Errors
                </span>
                <FaAngleDown className="text-2xl transition-transform duration-300 group-open:rotate-180" />
              </summary>

              <div className="flex flex-col text-left py-5 gap-5">
                <p>
                  Prices, promotions, discounts, or conditions published on the
                  website may be subject to change without prior notice.
                </p>

                <p>
                  Unless expressly stated otherwise, published prices may not
                  include taxes, government fees, registration, title,
                  documentation fees, administrative charges, accessories,
                  additional warranties, insurance, optional products, or other
                  applicable charges.
                </p>

                <p>
                  Lion Motors Group reserves the right to correct typographical
                  errors, pricing errors, availability errors, image errors,
                  technical errors, or any incorrect information published on
                  the website.
                </p>

                <p>
                  The publication of a price, promotion, or vehicle on the
                  website does not constitute a final contractual offer and does
                  not require Lion Motors Group to sell a vehicle under
                  incorrect, outdated, or mistakenly published conditions.
                </p>
              </div>
            </details>

            <details className="group border-b border-b-white py-4">
              <summary className="flex flex-row justify-between items-center hover:cursor-pointer list-none">
                <span className="font-semibold">
                  5. Vehicle Availability Requests
                </span>
                <FaAngleDown className="text-2xl transition-transform duration-300 group-open:rotate-180" />
              </summary>

              <div className="flex flex-col text-left py-5 gap-5">
                <p>
                  Our website may include forms to request information about the
                  availability of a vehicle.
                </p>

                <p>
                  When submitting a vehicle availability request, you may
                  provide information such as your first name, last name, email
                  address, ZIP code, phone number, vehicle of interest, and
                  additional comments.
                </p>

                <p>
                  Submitting a vehicle availability request does not guarantee
                  that the vehicle is available, reserved, or held for you.
                  Availability must be confirmed directly by Lion Motors Group.
                </p>

                <p>
                  Lion Motors Group may contact you by phone, text message, or
                  email to respond to your request, follow up on your interest,
                  provide information about vehicles, or share related
                  promotions and services.
                </p>
              </div>
            </details>

            <details className="group border-b border-b-white py-4">
              <summary className="flex flex-row justify-between items-center hover:cursor-pointer list-none">
                <span className="font-semibold">6. General Contact Form</span>
                <FaAngleDown className="text-2xl transition-transform duration-300 group-open:rotate-180" />
              </summary>

              <div className="flex flex-col text-left py-5 gap-5">
                <p>
                  Our website may include general contact forms that allow users
                  to communicate with Lion Motors Group.
                </p>

                <p>
                  By using these forms, you agree to provide true, current, and
                  complete information.
                </p>

                <p>
                  The information submitted may be used to respond to your
                  request, contact you, offer services, share vehicle
                  information, send promotions, or address any inquiry related
                  to Lion Motors Group.
                </p>
              </div>
            </details>

            <details className="group border-b border-b-white py-4">
              <summary className="flex flex-row justify-between items-center hover:cursor-pointer list-none">
                <span className="font-semibold">
                  7. Commercial Communications
                </span>
                <FaAngleDown className="text-2xl transition-transform duration-300 group-open:rotate-180" />
              </summary>

              <div className="flex flex-col text-left py-5 gap-5">
                <p>
                  By submitting information through our forms, you agree that
                  Lion Motors Group may contact you by phone, text message, or
                  email regarding your request, available vehicles, services,
                  promotions, or commercial communications.
                </p>

                <p>
                  Message and data rates may apply depending on your mobile
                  carrier.
                </p>

                <p>
                  You may request to stop receiving commercial communications at
                  any time by following the instructions included in our
                  communications or by contacting us directly.
                </p>
              </div>
            </details>

            <details className="group border-b border-b-white py-4">
              <summary className="flex flex-row justify-between items-center hover:cursor-pointer list-none">
                <span className="font-semibold">
                  8. Third-Party Financing Link
                </span>
                <FaAngleDown className="text-2xl transition-transform duration-300 group-open:rotate-180" />
              </summary>

              <div className="flex flex-col text-left py-5 gap-5">
                <p>
                  The Lion Motors Group website may include a financing-related
                  button or link, such as “Apply for Financing”.
                </p>

                <p>
                  When you click this button, you may be redirected to an
                  external financing website that is not owned, operated, or
                  controlled by Lion Motors Group.
                </p>

                <p>
                  Any personal, financial, credit-related, or other information
                  you provide on that external website will be collected and
                  processed by that third party according to its own terms,
                  conditions, and privacy policy.
                </p>

                <p>
                  Lion Motors Group does not control or guarantee the
                  availability, security, content, operation, privacy practices,
                  credit approval, financing terms, or decisions made by that
                  external website or any related financial institutions.
                </p>

                <p>
                  Your use of the external financing website is your sole
                  responsibility.
                </p>
              </div>
            </details>

            <details className="group border-b border-b-white py-4">
              <summary className="flex flex-row justify-between items-center hover:cursor-pointer list-none">
                <span className="font-semibold">
                  9. Financing and Credit Approval
                </span>
                <FaAngleDown className="text-2xl transition-transform duration-300 group-open:rotate-180" />
              </summary>

              <div className="flex flex-col text-left py-5 gap-5">
                <p>
                  Lion Motors Group does not guarantee financing approval,
                  credit approval, loans, or any financial product.
                </p>

                <p>
                  Any approval, interest rate, term, financed amount, monthly
                  payment, down payment, credit condition, or financing-related
                  decision will depend on the third-party financing provider,
                  participating financial institutions, and the information
                  provided by the applicant.
                </p>

                <p>
                  Any calculation, estimate, or financing-related reference
                  published on the website, if any, is provided for
                  informational purposes only and does not constitute an
                  approval or final credit offer.
                </p>
              </div>
            </details>

            <details className="group border-b border-b-white py-4">
              <summary className="flex flex-row justify-between items-center hover:cursor-pointer list-none">
                <span className="font-semibold">
                  10. Images and Visual Content
                </span>
                <FaAngleDown className="text-2xl transition-transform duration-300 group-open:rotate-180" />
              </summary>

              <div className="flex flex-col text-left py-5 gap-5">
                <p>
                  Vehicle images published on the website may be illustrative or
                  may correspond to the advertised vehicle, depending on the
                  case.
                </p>

                <p>
                  There may be differences between the images shown and the
                  actual condition of the vehicle, including color, accessories,
                  equipment, physical condition, cosmetic details, or specific
                  features.
                </p>

                <p>
                  Users are encouraged to verify the actual features and
                  condition of any vehicle directly with Lion Motors Group
                  before making a purchase decision.
                </p>
              </div>
            </details>

            <details className="group border-b border-b-white py-4">
              <summary className="flex flex-row justify-between items-center hover:cursor-pointer list-none">
                <span className="font-semibold">11. Intellectual Property</span>
                <FaAngleDown className="text-2xl transition-transform duration-300 group-open:rotate-180" />
              </summary>

              <div className="flex flex-col text-left py-5 gap-5">
                <p>
                  All content on this website, including text, images, logos,
                  designs, graphics, buttons, visual structure, trade names, and
                  other elements, belongs to Lion Motors Group or is used with
                  authorization, unless otherwise stated.
                </p>

                <p>
                  You may not copy, reproduce, distribute, modify, publish,
                  sell, or exploit website content without prior written
                  authorization from Lion Motors Group.
                </p>
              </div>
            </details>

            <details className="group border-b border-b-white py-4">
              <summary className="flex flex-row justify-between items-center hover:cursor-pointer list-none">
                <span className="font-semibold">
                  12. Links to Third-Party Websites
                </span>
                <FaAngleDown className="text-2xl transition-transform duration-300 group-open:rotate-180" />
              </summary>

              <div className="flex flex-col text-left py-5 gap-5">
                <p>
                  Our website may contain links to third-party websites,
                  including financing platforms, social media platforms,
                  external tools, maps, advertising services, or other related
                  websites.
                </p>

                <p>These links are provided only for the user’s convenience.</p>

                <p>
                  Lion Motors Group does not control these websites and is not
                  responsible for their content, security, availability,
                  services, privacy policies, terms of use, or business
                  practices.
                </p>

                <p>
                  We recommend that you review the terms and policies of any
                  external website before using it or submitting personal
                  information.
                </p>
              </div>
            </details>

            <details className="group border-b border-b-white py-4">
              <summary className="flex flex-row justify-between items-center hover:cursor-pointer list-none">
                <span className="font-semibold">13. Privacy</span>
                <FaAngleDown className="text-2xl transition-transform duration-300 group-open:rotate-180" />
              </summary>

              <div className="flex flex-col text-left py-5 gap-5">
                <p>
                  The use of personal information collected through our website
                  is governed by our Privacy Policy.
                </p>

                <p>
                  By using our website or submitting information through our
                  forms, you also agree to the practices described in our
                  Privacy Policy.
                </p>
              </div>
            </details>

            <details className="group border-b border-b-white py-4">
              <summary className="flex flex-row justify-between items-center hover:cursor-pointer list-none">
                <span className="font-semibold">
                  14. Limitation of Liability
                </span>
                <FaAngleDown className="text-2xl transition-transform duration-300 group-open:rotate-180" />
              </summary>

              <div className="flex flex-col text-left py-5 gap-5">
                <p>This website is provided “as is” and “as available”.</p>

                <p>
                  Lion Motors Group does not guarantee that the website will be
                  free from errors, interruptions, viruses, technical failures,
                  or outdated content.
                </p>

                <p>
                  To the fullest extent permitted by law, Lion Motors Group
                  shall not be liable for any direct, indirect, incidental,
                  special, consequential, or other damages arising from the use
                  of, or inability to use, the website, published information,
                  forms, external links, or third-party services.
                </p>
              </div>
            </details>

            <details className="group border-b border-b-white py-4">
              <summary className="flex flex-row justify-between items-center hover:cursor-pointer list-none">
                <span className="font-semibold">
                  15. No Purchase or Reservation Guarantee
                </span>
                <FaAngleDown className="text-2xl transition-transform duration-300 group-open:rotate-180" />
              </summary>

              <div className="flex flex-col text-left py-5 gap-5">
                <p>
                  Use of the website, submission of forms, vehicle availability
                  requests, or communication with Lion Motors Group does not
                  create an automatic contractual relationship, vehicle
                  reservation, obligation to sell, or purchase guarantee.
                </p>

                <p>
                  Any purchase, reservation, financing, contract, or agreement
                  must be confirmed directly with Lion Motors Group and will be
                  subject to availability, verification, documentation, final
                  terms, and compliance with applicable requirements.
                </p>
              </div>
            </details>

            <details className="group border-b border-b-white py-4">
              <summary className="flex flex-row justify-between items-center hover:cursor-pointer list-none">
                <span className="font-semibold">
                  16. Accuracy of User-Provided Information
                </span>
                <FaAngleDown className="text-2xl transition-transform duration-300 group-open:rotate-180" />
              </summary>

              <div className="flex flex-col text-left py-5 gap-5">
                <p>
                  You are responsible for providing true, current, complete, and
                  accurate information when using our forms.
                </p>

                <p>
                  Lion Motors Group shall not be responsible for delays,
                  communication errors, or inability to contact you caused by
                  incorrect, incomplete, or outdated information provided by the
                  user.
                </p>
              </div>
            </details>

            <details className="group border-b border-b-white py-4">
              <summary className="flex flex-row justify-between items-center hover:cursor-pointer list-none">
                <span className="font-semibold">
                  17. Changes to the Website
                </span>
                <FaAngleDown className="text-2xl transition-transform duration-300 group-open:rotate-180" />
              </summary>

              <div className="flex flex-col text-left py-5 gap-5">
                <p>
                  Lion Motors Group may modify, suspend, update, or remove any
                  part of the website at any time and without prior notice.
                </p>

                <p>
                  This includes vehicle information, prices, promotions, images,
                  forms, links, text, features, and general content.
                </p>
              </div>
            </details>

            <details className="group border-b border-b-white py-4">
              <summary className="flex flex-row justify-between items-center hover:cursor-pointer list-none">
                <span className="font-semibold">
                  18. Changes to These Terms and Conditions
                </span>
                <FaAngleDown className="text-2xl transition-transform duration-300 group-open:rotate-180" />
              </summary>

              <div className="flex flex-col text-left py-5 gap-5">
                <p>
                  Lion Motors Group may update these Terms and Conditions from
                  time to time.
                </p>

                <p>
                  When changes are made, the “Last updated” date at the top of
                  this document will be updated.
                </p>

                <p>
                  Your continued use of the website after any changes are posted
                  means that you accept the updated Terms and Conditions.
                </p>
              </div>
            </details>

            <details className="group border-b border-b-white py-4">
              <summary className="flex flex-row justify-between items-center hover:cursor-pointer list-none">
                <span className="font-semibold">19. Governing Law</span>
                <FaAngleDown className="text-2xl transition-transform duration-300 group-open:rotate-180" />
              </summary>

              <div className="flex flex-col text-left py-5 gap-5">
                <p>
                  These Terms and Conditions shall be governed by and
                  interpreted in accordance with the applicable laws of the
                  State of South Carolina, United States, without regard to any
                  conflict of law principles.
                </p>
              </div>
            </details>

            <details className="group border-b border-b-white py-4">
              <summary className="flex flex-row justify-between items-center hover:cursor-pointer list-none">
                <span className="font-semibold">20. Contact Us</span>
                <FaAngleDown className="text-2xl transition-transform duration-300 group-open:rotate-180" />
              </summary>

              <div className="flex flex-col text-left py-5 gap-5">
                <p>
                  If you have any questions about these Terms and Conditions,
                  you may contact us at:
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
