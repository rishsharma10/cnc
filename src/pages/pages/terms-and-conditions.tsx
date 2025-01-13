import CommonLayout from '@/components/common/CommonLayout'
import React,{ReactElement} from 'react'

const TermsConditions = () => {
  return (
    <div className='p-5'>
    <h1>Terms of Use</h1>
    <p>
      Welcome to the Copper & Crumb website. By continuing to browse and use this website, you agree to comply with and be bound by the following terms and conditions of use.
    </p>

    <h2>Use of the Website</h2>
    <ul>
      <li>The Copper & Crumb website and all its contents are provided on an "as is" basis without warranties of any kind.</li>
      <li>You acknowledge that your use of this website is at your sole risk, and Copper & Crumb shall not be liable for any damages related to your use of the site.</li>
      <li>The content on this site is subject to change without notice.</li>
      <li>This website contains material owned or licensed by us. Unauthorized reproduction is prohibited and may result in legal action.</li>
      <li>Links to other websites are provided for convenience. We are not responsible for their content.</li>
    </ul>

    <h2>Product Pricing</h2>
    <ul>
      <li>Product prices listed on the website are current. Copper & Crumb reserves the right to cancel any order in the event of a pricing error.</li>
      <li>Prices are subject to change without notice.</li>
      <li>All prices are in Indian Rupees (INR). Bank fees for international transactions are the customer’s responsibility.</li>
      <li>All products are subject to applicable GST in India.</li>
    </ul>

    <h2>#Mugshot Moments Friendship Day Contest - Terms and Conditions</h2>
    <h3>1. Contest Period</h3>
    <p>The contest will run on August 6th, 2023, and conclude at 12:00 AM. Results will be announced on August 8th, 2023, at 12:00 PM.</p>

    <h3>2. Eligibility</h3>
    <ul>
      <li>Open to Indian citizens residing in India aged 18 years or above.</li>
      <li>Employees of Copper & Crumb, its affiliates, and their immediate family members are not eligible.</li>
    </ul>

    <h3>3. How to Enter</h3>
    <ul>
      <li>Follow Copper & Crumb on Instagram (@copperandcrumb).</li>
      <li>Like the official #MugshotMoments contest post.</li>
      <li>Visit a Copper & Crumb outlet, take a picture with your favorite barista, and post it on your Instagram story, tagging @copperandcrumb and #mugshotmoments.</li>
    </ul>

    <h3>4. Winner Selection and Notification</h3>
    <ul>
      <li>Winners will be randomly selected and notified via Instagram Direct Message.</li>
      <li>Winners must respond within 48 hours to claim their prize.</li>
    </ul>

    <h3>5. Prizes</h3>
    <ul>
      <li>Each winner will receive a Coffee Mug and a Chocolate Bar.</li>
      <li>Prizes are non-transferable and no cash alternatives are available.</li>
    </ul>

    <h3>6. Consent and Release</h3>
    <p>
      By participating, contestants allow Copper & Crumb to use their entries for marketing without further compensation.
    </p>

    <h3>7. Rights of Copper & Crumb</h3>
    <ul>
      <li>Copper & Crumb reserves the right to reject any entry without explanation.</li>
      <li>All contest-related decisions are final.</li>
    </ul>

    <p>
      All disputes will be governed by the laws of India under the jurisdiction of the Karnataka High Court.
    </p>
  </div>

  )
}
TermsConditions.getLayout = function getLayout(page: ReactElement) {
    return (
      <CommonLayout>
        {page}
      </CommonLayout>
    )
  }
export default TermsConditions