import React, { Component } from 'react'
import 'react-toastify/dist/ReactToastify.css'
import './eula.scss'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
	createErrorMessageSelector,
	createLoadingSelector
} from '../../../store/utils/selectors'
import { eulaAccepted } from '../scenario-actions'
import logo from '../../../assets/img/SVG/logo.svg'
import { Navbar } from 'react-bootstrap'
import ExpiryWarning from '../../../components/ExpiryWarning/ExpiryWarning'
import { LOGIN_FOOTER } from '../../../assets/Icons'
import cx from 'classnames'

require('formdata-polyfill')

class Eula extends Component {
	state = {
		authError: 'Please log in!'
	}

	returnEULA = () => (
		<div>
			<div className={'scrollingContent'}>
				<p>
					PLEASE READ THESE TERMS OF SERVICE CAREFULLY. THESE TERMS OF SERVICE
					ARE A BINDING AGREEMENT (THE
					<b>
						<i>
							<q>AGREEMENT</q>
						</i>
					</b>
					) ENTERED INTO BETWEEN ACRETO CLOUD CORP., A DELAWARE CORPORATION WITH
					OFFICES AT 36 GRAHAM STREET, JERSEY CITY NJ 07307 (OR WITH ITS
					AFFILIATE, AS APPLICABLE) (
					<b>
						<i>
							<q>ACRETO</q>
						</i>
					</b>
					) AND THE ENTITY OR PERSON IDENTIFIED ON ANY ORDER FOR SOFTWARE AS A
					SERVICE (FOR SUBSCRIPTION SERVICES OR ON TRIAL BASIS), WHICH IS
					CONFIRMED BY ACRETO (
					<b>
						<i>
							<q>CUSTOMER</q>
						</i>
					</b>
					,{' '}
					<b>
						<i>
							<q>ORDER</q>
						</i>
					</b>{' '}
					and RESPECTIVELY).
					<br />
					BY (I) CUSTOMER CLICKING THROUGH THIS AGREEMENT ELECTRONICALLY, (II)
					THE PARTIES ENTERING INTO AN ORDER REFERENCING THIS AGREEMENT, OR
					(III) CUSTOMER USING THE SERVICES, CUSTOMER AND ACRETO MUTUALLY AGREE
					TO BE BOUND BY THE TERMS AND CONDITIONS HEREOF. EACH ORDER SHALL BE
					MUTUALLY AGREED TO AND ENTERED INTO BETWEEN CUSTOMER AND ACRETO,
					PROVIDED THAT, IF CUSTOMER PURCHASES THE SERVICES THROUGH AN ACRETO
					AUTHORIZED PARTNER (
					<b>
						<i>
							<q>RESELLER</q>
						</i>
					</b>
					), THE ORDER SHALL BE THE ORDER ENTERED INTO BETWEEN ACRETO AND THE
					RESELLER FOR CUSTOMER’S USE. IF YOU DO NOT ACCEPT THE TERMS OF THIS
					AGREEMENT, YOU ARE NOT PERMITTED TO USE THE SERVICES.
					<br />
					IF YOU ARE ENTERING INTO THIS AGREEMENT AS AN AGENT, EMPLOYEE OR
					REPRESENTATIVE OF YOUR EMPLOYER, THE TERM “CUSTOMER” MEANS
					YOUREMPLOYER AND/OR ANY OTHER PARTY ON WHOSE BEHALF YOU ACT, AND
					YOUREPRESENT AND WARRANT THAT YOU HAVE THE AUTHORITY TO ACT ON
					SUCHPARTY’S BEHALF.
				</p>
				<p className={'header'}>
					<b>1. DEFINITIONS</b>
				</p>
				<p>
					<b>
						<i>
							<q>Affiliate</q>
						</i>
					</b>{' '}
					means any entity controlled by, controlling, or under common control
					with a party to this Agreement during the period such control exists,
					where{' '}
					<b>
						<i>
							<q>control</q>
						</i>
					</b>{' '}
					means the power to direct the operation, policies and management of an
					entity through the ownership of at least fifty percent (50%) of the
					voting stock or other ownership interests of such entity or the
					ability, by voting securities, contract or otherwise, to elect a
					majority of the board of directors or other governing body of such
					entity or to direct or cause the direction of the management and
					policies of such entity.{' '}
					<b>
						<i>
							<q>Documentation</q>
						</i>
					</b>{' '}
					means any technical documentation, the user guidelines and other user
					documentation related to the use or operation of the Services, each as
					officially published and made available by ACRETO electronically via
					the Services or otherwise in writing.{' '}
					<b>
						<i>
							<q>Services</q>
						</i>
					</b>{' '}
					means the services specified in the Order as further described in the
					Documentation (including any updates to the Services provided by
					ACRETO in its sole discretion, and any software and/or systems owned,
					controlled or provided by ACRETO used in the Services).
				</p>
				<p className={'header'}>
					<b>2. Services</b>
				</p>
				<p className={'sub-header'}>
					<b>2.1 License Grant</b>
				</p>
				<p>
					ACRETO shall provide the Services as described in an Order underthis
					End User License Agreement for Customers utilizing Acreto Services on
					a month- to- month basis. An order shall consist of the addition of a
					new Ecosystem, or the addition or deletion of a device within an
					Ecosystem. Subject to the terms and conditions of this Agreement,
					ACRETO grants Customer, during the subscription term specified in an
					Order, a non-exclusive, non-transferable license (without the right to
					sub-license) to access and use the Services for Customer’s internal
					business purposes in accordance with the Documentation. In connection
					with such use, Customer shall have the right to allow its employees
					and contractors (
					<b>
						<i>
							<q>Authorized Users</q>
						</i>
					</b>
					) to use the Services on Customer’s behalf, subject to their
					compliance with the terms of this Agreement, and Customer shall remain
					liable for any non-compliance by Authorized Users. ACRETO, and/or any
					of its Affiliates, owns all right, title and interest in the Services
					and in the underlying intellectual property thereof. Nothing in this
					Agreement shall be construed to grant Customer any rights in ACRETO’s
					Services or its underlying intellectual property beyond those
					expressly provided for herein
				</p>
				<p className={'sub-header'}>
					<b>2.2 License Restrictions</b>
				</p>
				<p>
					Customer shall not (directly or indirectly): (i) remove any notice of
					proprietary rights from the Services, (ii) reverse engineer,
					decompile, attempt to derive the source code or underlying ideas or
					algorithms of any part of the Services (except to the limited extent
					applicable laws specifically prohibit such restriction), attempt to
					recreate the Services or use the Services for any competitive purpose,
					(iii) copy, modify, translate or otherwise create derivative works of
					any part of the Services, (iv) sell, resell, encumber, rent, lease,
					time-share, distribute, transfer or otherwise use orexploit or make
					available any of the Services to or for the benefit of any third
					party, or (v) use the Services to infringe on the intellectual
					property rights, publicity rights, or privacy rights of any third
					party, or to store defamatory, trade libelous, or otherwise unlawful
					data. Customer’s authorized use of the Services is subject to the
					purchased quantities and features set forth in the applicable Order
					for the Services, and any usage guidelines and acceptable use policies
					to the extent applicable to Customer’s usage of the Service.
				</p>
				<p className={'sub-header'}>
					<b>2.3 Login Access to the Services</b>
				</p>
				<p>
					Customer is solely responsible for ensuring: (i) that only appropriate
					Authorized Users have access to the Services, (ii) that such
					AuthorizedUsers have been trained in proper use of the Services, and
					(iii) proper usage of passwords, tokens and access procedures with
					respect to logging into the Services. ACRETO reserves the right to
					refuse registration of, or to cancel, login IDs that it reasonably
					believes to violate the terms and conditions set forth in this
					Agreement, in which case ACRETO will promptly electronically inform
					Customer of such refusal or cancellation.
				</p>
				<p className={'sub-header'}>
					<b>2.4 Trial Services.</b>
				</p>
				<p>
					If Customer is using a free trial, proof of concept version of the
					Services, a beta version of the Services, or using the Services on any
					other free-of-charge basis as specified in an Order including any
					related support services to the extent provided by ACRETO in its sole
					discretion (collectively, “Trial Services”), ACRETO makes such Trial
					Services available to Customer until the earlier of (i) the endof the
					free trial or proof of concept period or beta testing period as
					communicated by ACRETO, (ii) the start date of any purchased version
					of such Services, or (iii) written notice of termination from ACRETO.
					Customer is authorized to use Trial Services only for evaluation and
					not for any business or productive purposes, unless otherwise
					authorized by ACRETO in writing. Any data Customer enters into the
					Trial Services and any configurations made to the Trial Services by or
					for Customer during the term of such Trial Services will be
					permanently lost unless Customer (a) has purchased a subscription to
					the same Services as covered by the Trial Services or (b) exports such
					data or configurations before the end of such free period. There is no
					guarantee that features or functions of the Trial Services will be
					available, or if available will be the same, in the general release
					version of the Service, and Customer should review the Service
					features and functions before making a purchase. Notwithstanding
					anything to the contrary, ACRETO provides the Trial Services “as is”
					and “as available” without any warranties or representations of any
					kind. To the extent permitted by law, ACRETO disclaims all implied
					warranties and representations, including, without limitation, any
					implied warranty of merchantability, fitness for a particular purpose
					and non-infringement. Customer assumes all risks and all costs
					associated with its use of the Trial Services. Customer’s sole and
					exclusive remedy in case of any dissatisfaction or ACRETO’s breach of
					the Agreement with respect to such Trial Services is termination ofthe
					Trial Services. Any obligations on behalf of ACRETO to indemnify,
					defend, or hold harmless under this Agreement (including without
					limitation ACRETO’s obligations under Section 9) are not applicable to
					Customers using Trial Services.
				</p>
				<p className={'sub-header'}>
					<b> 2.5 Infrastructure</b>
				</p>
				<p>
					Acreto reserves the right to modify its infrastructure using in-house
					or third-party products and services as required to satisfy its
					business needs.
				</p>

				<p className={'header'}>
					<b> 3. CUSTOMER DATA</b>
				</p>
				<p>
					Customer owns all right, title and interest in all data and/or content
					created or provided by Customer, and in all data derived from it,
					specifically excluding the Non-Identifiable Aggregated Data and
					Non-Identifiable Threat Indicators (defined below) (
					<b>
						<i>
							<q>Customer Data</q>
						</i>
					</b>
					). Nothing in this Agreement shall be construed to grant ACRETO any
					rights in to Customer Data beyond those expressly provided herein.
					Customer agrees that ACRETO shall own all right, title and interest in
					the Non-Identifiable Aggregated Data and Non-Identifiable Threat
					Indicators. For clarity, ACRETO will not store any Customer Data other
					than as required for the provision of the Services, except to the
					extent that it constitutes Customer Meta-Data or Non-Identifiable
					Threat Indicators. As between ACRETO and Customer, Customer is solely
					responsible for the content, quality and accuracy of Customer Data,
					for securing any necessary approvals for ACRETO’s use ofthe Customer
					Data as provided for herein, and for ensuring that the Customer Data
					as made available by Customer complies with applicable laws and
					regulations. ACRETO isnot responsible for Customer Data once it leaves
					the ACRETO domain of control, including by way of example, if Customer
					communicates or stores data in-house or at other third parties.
				</p>
				<p>
					Notwithstanding any other restrictions on use of data in this or any
					other agreement:
				</p>

				<p className={'sub-header'}>
					<b>3.1 Use of Customer Data</b>
				</p>
				<p>
					Customer grants ACRETO the limited, non-exclusive right to use the
					Customer Data solely for the purpose of providing the Services to
					Customer in accordance with the Documentation (including routine
					actions taken to enable data backups and disaster recovery and
					business continuity procedures).
				</p>
				<p className={'sub-header'}>
					<b>3.2 Use of Customer Meta-Data</b>
				</p>
				<p>
					Customer grants ACRETO the limited, non-exclusive right to view, and
					use the Customer Data to create meta-data derived from Customer Data
					which may include, by way of example only, threat intelligence, file
					modification dates, audit trails, and the number of times a file has
					been accessed (
					<b>
						<i>
							<q>Customer Meta-Data</q>
						</i>
					</b>
					), for the purpose of providing and improving the Services.
				</p>
				<p className={'sub-header'}>
					<b>3.3 Use of Aggregated Data</b>
				</p>
				<p>
					Customer grants ACRETO the right to collect and use sanitized and
					anonymized generic statistical information derived from such Customer
					Meta-Data and aggregate it with statistical information from other
					customers (
					<b>
						<i>
							<q>Non-Identifiable Aggregated Data</q>
						</i>
					</b>
					) for ACRETO’s reasonable business purposes, including without
					limitation for threat intelligence, analyzing customer needs and
					improving the Services.
				</p>
				<p className={'sub-header'}>
					<b>3.4 Use of Threat Intelligence Indicators</b>
				</p>
				<p>
					With respect to certain Services, Customer grants ACRETO the right to
					collect and use anonymized threat intelligence indicators directly
					derived from the provision of the Services, (
					<b>
						<i>
							<q>Non-Identifiable Threat Indicators</q>
						</i>
					</b>
					) for ACRETO’s reasonable business purposes, including without
					limitation for improving the Services.
				</p>
				<p className={'sub-header'}>
					<b>3.5 Compliance with laws and standards</b>
				</p>
				<p>
					Customer is solely responsible to ensure compliance with any industry
					specific, local, state, federal and international laws and compliance
					standards.
				</p>
				<p className={'header'}>
					<b>4. SUPPORT</b>
				</p>
				<p className={'sub-header'}>
					<b>4.1 UPDATES AND MAINTENANCE</b>
				</p>
				<p>
					From time-to-time updates and upgrades of customer owned, controlled
					and / or operated systems are necessary to ensure optimal security and
					functionality. Customer is solely responsible to ensure its systems
					are adhere to such.
				</p>
				<p className={'header'}>
					<b>5. FEES</b>
				</p>
				<p className={'sub-header'}>
					<b>5.1 Payment Terms</b>
				</p>
				<p>
					Access Fees, Usage Fees and Incidental Fees will be calculated and
					billed to your payment method at regular intervals. The billing
					statement will be sentto the financial Administrator’s account. All
					Customer amounts payable under this Agreement will be paid without set
					off or counterclaim, and without any deduction or withholding. Fees
					and charges for any new Service or new feature of a Service will be
					effective when updated fees and charges are posted on the Acreto Site,
					unless we expressly stated otherwise. Acreto may apply new or
					increased charges for any Services with at least 30 days’ prior
					notice.
					<br />A 1.5% per month fee (or the highest rate permitted by law, if
					less) on all returned or latepayments. Fees do not include sales, use,
					value added or other excise tax. Customer isresponsible for payment of
					all such taxes based on fees paid or payable hereunder (but not taxes
					based on ACRETO’s gross revenues or net income) together with any
					interest on such taxes. This Section will apply to the ACRETO Reseller
					if the Order is placed by it, with the necessary changes and subject
					to its valid agreement with ACRETO.
				</p>
				<p className={'sub-header'}>
					<b>5.2 Reasonable Use of Services</b>
				</p>
				<p>
					Fees for the Service are based on “normal usage” ofthe Service in a
					manner consistent with its intended purposes and as described in the
					Documentation. We may suspend your or any End User’s right to access
					or use any portion or all of the Services immediately upon notice to
					you if we determine that you or or an End User’s use of the Services
					(i) poses a security risk to the Services or any thirdparty, (ii)
					could adversely impact our systems or the Services, or, (iii) could
					subject us, our affiliates, or any third party to liability.
				</p>
				<p className={'header'}>
					<b>6. TERM AND RENEWAL</b>
				</p>
				<p className={'sub-header'}>
					<b>6.1 Term of the Agreement</b>
				</p>
				<p>
					ACRETO will provide the Services during the term in which Customer is
					utilizing and paying for the Services. During the term period, this
					Agreement shall remain in effect unless or until terminated in
					accordance with the termshereof.
				</p>
				<p className={'sub-header'}>
					<b>6.2 Non-payment</b>
				</p>
				<p>
					ACRETO may terminate the Agreement and/or suspend the Services if
					ACRETO has not received payment for such Services and if such failure
					is not cured within the period of time stated in ACRETO written notice
					advising of such failure (which shall be at least 5 business days).
				</p>

				<p className={'sub-header'}>
					<b>6.3 Impactful Events</b>
				</p>
				<p>
					Acreto reserves the right at its sole discretion to terminate, suspend
					or take other mitigating actions should a Customer platform represent
					a service impacting event or events, including impact to the
					integrity, privacy, availability or health of Acreto, other customer,
					or other third parties.
				</p>
				<p className={'sub-header'}>
					<b>6.4 Illegal Activity</b>
				</p>
				<p>
					Acreto reserves the right at its discretion or upon the request or
					law-enforcement or government agency to terminate, suspend or take
					other mitigating actions should a Customer platform operate in a
					manner that represents risk to local, regional or national security.
				</p>
				<p className={'sub-header'}>
					<b>6.5 Effect of Termination</b>
				</p>
				<p>
					Upon termination of the Services: (i) Customer will have no further
					right to access or use the Services. ACRETO has no obligation to the
					Customer to store or retain customer data, nor is Acreto liable for
					any impact or other damages such termination may cause. The provisions
					of Sections 3, 5, 6.4, 7, 9, 10, 11, 13, and 14 shall survive
					termination.
				</p>
				<p className={'header'}>
					<b>7. CONFIDENTIALITY</b>
				</p>
				<p className={'sub-header'}>
					<b>7.1 Confidential Information</b>
				</p>
				<p>
					Each party may have access to information that is confidential or
					proprietary to the other party and/or its Affiliates. For purposes of
					this Agreement,{' '}
					<b>
						<i>
							<q>Confidential Information</q>
						</i>
					</b>{' '}
					means the confidential information of a party and/or its Affiliates
					which is disclosed to the other party in connection with this
					Agreement, whether disclosed in written, oral, electronic, visual or
					other form, which is identified as confidential at the time of
					disclosure or should reasonably be understood tobe confidential given
					the nature of the information and the circumstances surrounding the
					disclosure, including without limitation information regarding a
					party’s business, operations, finances, technologies, current and
					future products and services, pricing, personnel, customers and
					suppliers, the Customer Data, ACRETO’s Services and each Party’s
					intellectual property. Confidential Information excludes information
					to the extent such information (i) is or becomes part of the public
					domain or otherwise is publicly available through no act or omission
					of the receiving party; (ii) was in the receiving party’s lawful
					possession prior to the disclosure and was not obtained directly or
					indirectly from the disclosing party; (iii) is lawfully disclosed to
					the receiving party by a third party without restriction on
					disclosure; or (iv) is independently developed by the receiving party
					without use of or reference to the disclosing party’s Confidential
					Information.
				</p>
				<p className={'sub-header'}>
					<b>
						7.2 Restrictions on Use and Disclosure of Confidential Information
					</b>
				</p>
				<p>
					The receiving party will use the disclosing party’s Confidential
					Information solely as necessary in connection with the performance of
					this Agreement. The receiving party shall maintain the confidentiality
					of the disclosing party’s Confidential Information using at least the
					same degree of care that such party uses to protect its own
					Confidential Information of a similar nature, and shall restrict
					disclosure of the disclosing party’s Confidential Information to its
					employees, consultants, contractors, agents and representatives who
					have a need to know such information and are bound by obligations of
					confidentiality and non-use no less restrictive than those set forth
					herein; provided, that a party may disclose the disclosing party’s
					Confidential Information if required by law and provided the receiving
					party provides prompt notice of such requirement and disclosure to the
					other party to the extent allowed by law. The receiving party shall
					have the right to disclose Confidential Information of the other party
					pursuant to the order or requirement of a court, administrative
					agency, or other governmental body provided that the receiving party
					provides prompt, advance written notice thereof to enable the
					disclosing party to seek a protective order or otherwise prevent such
					disclosure. In the event such a protective order is not obtained by
					the disclosing party, the receiving party shall disclose only that
					portion of the Confidential Information which its legal counsel
					advises that it is legally required to disclose. Confidential
					Information so disclosed shall continueto be deemed Confidential
					Information.
				</p>
				<p className={'sub-header'}>
					<b>7.3 Equitable and Injunctive Relief</b>
				</p>
				<p>
					If a party breaches any of its obligations with respect to
					confidentiality or use or disclosure of Confidential Information
					hereunder, the other party is entitled to seek equitable and
					injunctive relief in addition to all other remedies that may be
					available to protect its interest without having to post a bond or
					prove irreparable harm.
				</p>
				<p className={'header'}>
					<b>8. WARRANTIES AND DISCLAIMERS</b>
				</p>
				<p className={'sub-header'}>
					<b>8.1 Limited Services Warranty</b>
				</p>
				<p>
					During the term of this Agreement, ACRETO warrants that the Services
					will perform in substantial conformity with industry best practices,
					and that the Services are not designed to contain viruses, worms,
					Trojan horses or other unintended malicious or destructive code, or
					any code designed to intentionally cause the Services to stop
					functioning. ACRETO further warrants that it shall maintain and
					enforce reasonable safety and security procedures in providing the
					Services that are compliant with applicable industry standards for
					such Services.
					<br />
					Customer shall be required to report any breach of warranty to ACRETO
					within a period of fourteen (14) days of the date on which the
					incident giving rise to the claim occurred. ACRETO’s sole and
					exclusive liability, and Customer’s sole and exclusive remedy, for
					breach of this warranty will be for ACRETO, at its expense, to use
					reasonable commercial efforts to correct such nonconformity within
					thirty (30) days of the date that notice of the breach was provided;
					and, if ACRETO fails to correct the breach within such cure period,
					Customer may terminate the affected Order and, in such event, ACRETO
					shall provide Customer with a pro-rata refund of any unused pre-paid
					fees paid for the period following termination as calculated on a
					monthly basis.
				</p>
				<p className={'sub-header'}>
					<b>8.2 Compliance with Law</b>
				</p>
				<p>
					Each party shall comply with all applicable, laws and regulations in
					connection with the performance of its obligations and the exercise of
					its rights under this Agreement.
				</p>
				<p className={'sub-header'}>
					<b>8.3 Disclaimer</b>
				</p>
				<p>
					THE EXPRESS WARRANTIES SET FORTH IN THIS SECTION ARE THE ONLY
					WARRANTIES GIVEN BY ACRETO WITH RESPECT TO THE SERVICES OR THIS
					AGREEMENT. ACRETO DISCLAIMS ALL OTHER WARRANTIES, EXPRESS,IMPLIED OR
					ARISING BY CUSTOM OR TRADE USAGE, INCLUDING WITHOUT LIMITATION
					WARRANTIES THAT THE SERVICES ARE MERCHANTABLE, WILL OPERATE
					UNINTERRUPTED OR FREE OF DEFECT OR ERROR, NON-INFRINGING, OR FIT FOR
					ANY PARTICULAR PURPOSE. ACRETO DOES NOT MAKE ANY REPRESENTATIONS OR
					WARRANTIES REGARDING THE ACCURACY OR COMPLETENESS OF THE SERVICES.
					CUSTOMER AGREES THAT ITS PURCHASES HEREUNDER ARE FOR THE CURRENTLY
					AVAILABLE SERVICES AND ARE NEITHER CONTINGENT ON THE DELIVERY OF ANY
					FUTURE FUNCTIONALITY OR FEATURES NOR DEPENDENT ON ANY ORAL OR WRITTEN
					PUBLIC COMMENTS MADE BY ACRETO REGARDING FUTURE FUNCTIONALITY OR
					FEATURES.
				</p>

				<p className={'header'}>
					<b>9. INDEMNIFICATION</b>
				</p>
				<p className={'sub-header'}>
					<b>9.1 Infringement Indemnity</b>
				</p>
				<p>
					ACRETO shall indemnify and defend Customer and its Affiliates,
					officers, directors and employees (the
					<b>
						<i>
							<q>Customer Indemnified Parties</q>
						</i>
					</b>
					) against all third-party claims, suits and proceedings resulting from
					Customer’s use of the Services in accordance with this Agreement and
					Documentation violating, misappropriating, or infringing such third
					party’s patent, copyright, trademark, trade secret or other
					intellectual property right, and all directly related losses,
					liabilities, damages, costs and expenses (including reasonable
					attorneys’ fees); provided that ACRETO shall not be responsible for
					any Claim to the extent arising from (i) use of the Services in
					violation of the terms of this Agreement, (ii) use of the Services in
					combination with software, hardware, systems or data not required by
					the Documentation(iii) ACRETO’s compliance with specifications,
					requirements or requests of Customer, or (iv) Customer’s gross
					negligence or willful misconduct. If the Services become, or in
					ACRETO’s opinion are likely to become, the subject of a valid claim of
					infringement or the like under any applicable law, ACRETO shall have
					the right, at its option and expense, either to (a) obtain for
					Customer a license permitting the continued use of the Services, (b)
					replace or modify the Services so that they become non-infringing, or
					(c) if neither of the foregoing options are available in a timely
					manner on commercially reasonable terms, terminate the affected Order
					and provide Customer with a pro-rata refund of any unused pre-paid
					fees paid for the period following termination as calculated on a
					monthly basis.
				</p>

				<p className={'sub-header'}>
					<b>9.2 Customer Data and Use Indemnity</b>
				</p>
				<p>
					Customer shall defend, at its expense, any claims, suits and
					proceedings brought by a third party against ACRETO and/or its
					Affiliates or their officers, directors and employees (the{' '}
					<b>
						<i>
							<q>ACRETO Indemnified Parties</q>
						</i>
					</b>
					) arising from an alleged infringement or violation by the Customer
					Data of a third party patent, copyright or trade secret, or ACRETO’s
					use of the Customer Data in accordance with the terms of this
					Agreement; and Customer shall indemnify and hold the ACRETO
					Indemnified Parties harmless against all damages and costs awarded
					against the ACRETO Indemnified Parties in connection with such claim,
					suit or proceeding.
				</p>

				<p className={'sub-header'}>
					<b>9.3 Indemnification Process and Exclusivity</b>
				</p>
				<p>
					A party’s indemnification and defense obligations herein will become
					effective upon, and are subject to, (a) the indemnified party’s prompt
					notification to the indemnifying party of any claims, suits or
					proceedings (a “Claim”) in writing, and (b) the indemnified party
					providing the indemnifying party with full and complete control,
					authority and information for the defense of the Claim, provided that
					the indemnifying party will have no authority to enter into any
					non-monetary settlement or admission of indemnified party’s wrongdoing
					on behalf of the indemnified party without the indemnified party’s
					prior written consent (not to be unreasonably withheld). At the
					indemnifying party’s written request, the indemnified party shall
					reasonably cooperate with the indemnifying party in defending or
					settling anyClaim. The rights and remedies set forth in this Section 9
					state a party’s sole and exclusive liability and the other party’s
					sole and exclusive rights and remedies with regard to any Claims
					arising out of or relating to this Agreement.
				</p>
				<p className={'header'}>
					<b>10. Limitations of Liability</b>
				</p>
				<p>
					TO THE MAXIMUM EXTENT PERMITTED BY LAW AND EXCEPT FOR EITHER PARTY’S
					GROSS NEGLIGENCE OR WILLFUL MISCONDUCT,IN NO EVENT SHALL EITHER PARTY
					BE LIABLE FOR SPECIAL, INDIRECT, INCIDENTAL, TORT OR CONSEQUENTIAL
					DAMAGES (INCLUDING ANY DAMAGES RESULTING FROM LOSS OF USE, LOSS OF OR
					DAMAGE TO SOFTWARE OR DATA, LOSS OF PROFITS OR LOSS OF BUSINESS)
					ARISING OUT OF OR IN CONNECTION WITH THIS AGREEMENT OR THE SERVICES
					FURNISHED HEREUNDER, EVEN IF SUCH PARTY HAS BEEN ADVISED OF THE
					POSSIBILITY OF SUCH DAMAGES.
					<br />
					TO THE MAXIMUM EXTENT PERMITTED BY LAW, AND EXCEPT FOR ANY CLAIM TO
					THE EXTENT ARISING FROM OR IN CONNECTION WITH EITHER PARTY’S GROSS
					NEGLIGENCE OR WILLFUL MISCONDUCT, OR EITHER PARTY’S IDEMNIFICATION
					OBLIGATIONS PURSUANT TO SECTION 9 ABOVE, OR PERSONAL INJURY, DEATH OR
					DAMAGE TO TANGIBLE PROPERTY, IN NO EVENT SHALL THE AGGREGATE LIABILITY
					OF EITHER PARTY HEREUNDER EXCEED (I) EXCEPT AS PROVIDED IN (II) BELOW,
					THE TOTAL OF THE FEES PAID AND PAYABLE BY CUSTOMER TO ACRETO FOR THE
					THEN CURRENT SUBSCRIPTION TERM UNDER THE ORDER TO WHICH THE INITIAL
					CLAIM RELATES (THE{' '}
					<b>
						<i>
							<q>AGGREGATE FEES</q>
						</i>
					</b>
					), OR (II) SOLELY FOR DAMAGES RESULTING FROM A PARTY’S BREACH OF ITS
					CONFIDENTIALITY OBLIGATIONS PURSUANT TO SECTION 7, THREE (3) TIMES THE
					AGGREGATE FEES. THE LIMITATIONS OF LIABILITY IN THIS PARAGRAPH APPLY
					WHETHER SUCH LIABILITY ARISES IN CONTRACT, TORT (INCLUDING
					NEGLIGENCE), UNDER STATUTE OR OTHERWISE.
				</p>
				<p className={'header'}>
					<b>11. U.S. GOVERNMENT RESTRICTED RIGHTS</b>
				</p>
				<p className={'sub-header'}>
					<b>11.1 EXPORT RESTRICTIONS</b>
				</p>
				<p>
					If Customer is an agency or contractor of the United States
					Government, Customer acknowledges and agrees that (i) the Services
					(including any software forming a part thereof) were developed
					entirely at private expense, (ii) the Services (including any software
					forming a part thereof) in all respects constitute proprietary data
					belonging solely to ACRETO, (iii) the Services (including any software
					forming a part thereof) are not in the public domain, and (iv) the
					software forming a part of the Services is “Commercial Computer
					Software” as defined in sub-paragraph (a)(1) of DFAR Section
					252.227-7014 or FAR Part 12.212. Customer agrees not to store or
					process any Customer Data that is subject to the International Traffic
					in Arms Regulations maintained by the United States Department of
					State. Customer shall comply with the export laws and regulations of
					the United States, the State of Israel and other
					applicablejurisdictions in using the Services and obtain any permits,
					licenses and authorizations required for such compliance. Without
					limiting the foregoing, (i) Customer represents that it is not named
					on any U.S. government list of persons or entities prohibited from
					receiving exports, (ii) Customer shall not permit users to access or
					use the Services in violation of any U.S. and Israeli export embargo,
					prohibition or restriction, and (iii) Customer shall comply with all
					applicable laws regarding the transmission of technical data exported
					from the United States and the country in which its users are located.
				</p>
				<p className={'header'}>
					<b>12. SERVICE SUGGESTIONS</b>
				</p>
				<p>
					To the extent that Customer provides ACRETO with ideas or suggestions
					for improvements or changes to the Service which constitute
					intellectual property rights under applicable law (
					<b>
						<i>
							<q>Suggestions</q>
						</i>
					</b>
					), Customer hereby assigns to ACRETO ownership of such Suggestions and
					ACRETO will have sole discretion as to whether and how to implement
					such Suggestions into the Service.
				</p>
				<p className={'header'}>
					<b>13. MODIFICATIONS</b>
				</p>
				<p>
					ACRETO may change the Terms of Service from time to time. For any
					material change to any of the foregoing, ACRETO will inform Customer
					via electronic communications.
				</p>
				<p className={'header'}>
					<b>14. GENERAL PROVISIONS</b>
				</p>
				<p className={'sub-header'}>
					<b>14.1 Notices</b>
				</p>
				<p>
					All notices under this Agreement shall be made in writing and
					delivered toeach party at the address under its signature hereto.
					Notices shall be deemed delivered(i) upon personal delivery with
					signature required, (ii) one Business Day after they have been sent to
					the recipient by reputable overnight courier service (charges prepaid
					and signature required), or (iii) upon successful transmission of an
					email containing such notice if sent between 9 a.m. and 5 p.m., local
					time of the recipient, on any Business Day, and as of 9 a.m. local
					time of the recipient on the next Business Day if sent at any other
					time, or (iv) three Business Days after deposit in the mail.{' '}
					<b>
						<i>
							<q>Business Day</q>
						</i>
					</b>{' '}
					as used in this Section 14.1 shall mean any day other than Saturday,
					Sunday or a day on which banking institutions are not required to be
					open in the Commonwealth of Massachusetts.
				</p>
				<p className={'sub-header'}>
					<b>14.2 Entire Agreement</b>
				</p>
				<p>
					This Agreement together with each Order represent the entire agreement
					between Customer and ACRETO with respect to the subject matter hereof,
					and supersede all prior proposals, representations and agreements,
					whether written or oral, with respect thereto. This Agreement shall
					govern with respect to all Orders and forms of purchases, whether
					submitted through electronic transmissions or otherwise, unless
					otherwise agreed by both parties in writing. The terms and conditions
					of this Agreement shall take precedence over any conflicting terms in
					the Order (or, an agreement between ACRETO and the Reseller, if
					applicable) unless the Order (or the Reseller’s agreement) expressly
					amends this Agreement and is signed by both parties. Any waiver,
					amendment, or modification of any right or remedy, in whole or in part
					underthis Agreement, or any additional or different terms in any
					purchase orders, acknowledgments or other documents other than the
					Order, will not be effective unless expressly agreed to by both
					parties in writing or electronic form. If Customer issues a purchase
					order in connection with an Order, such purchase order shall be solely
					for Customer’s internal administrative purposes and to facilitate
					payment. In no event shall the terms of such purchase order modify or
					become part of these Terms of Service or become binding on ACRETO even
					if ACRETO signs an acknowledgment copy of such purchase order
				</p>
				<p className={'sub-header'}>
					<b>14.3 Assignment and Subcontractors</b>
				</p>
				<p>
					Except as expressly provided for herein, this Agreement may not be
					assigned by either party without the prior written consent of the
					other party, which shall not be unreasonably withheld, including by
					reason of a change of control or by operation of law. ACRETO may
					assign this Agreement, without consent, in whole (but not in part), to
					a successor in interest to its business including in connection with a
					change of control, merger, acquisition, sale of all or substantially
					all ofits assets, or similar transaction. ACRETO may use
					subcontractors in connection with the performance of the Services
					provided that it shall be responsible for the acts and omissions of
					its subcontractors to the same extent as it would be responsible
					hereunder for its own acts and omissions. The terms of this Agreement
					shall be binding upon the permitted successors and assigns of each
					party.
				</p>
				<p className={'sub-header'}>
					<b>14.4 Governing Law and Jurisdiction</b>
				</p>
				<p>
					The terms of this Agreement shall be construed in accordance with the
					substantive laws of New Jersey without regard to its principles
					ofconflict of law or the U.N. Convention on Contracts for the
					International Sale of Goods. The Uniform Computer Information
					Transactions Act (
					<b>
						<i>
							<q>UCITA</q>
						</i>
					</b>
					) will not apply to this Agreement regardless of when and howsoever
					adopted, enacted and further amended under the governing state laws.
					The parties irrevocably consent to the exclusive jurisdiction of the
					courts of New Jersey over any action, suit or proceeding arising
					hereunder, and to the extent not prohibited by law, each of the
					parties hereby irrevocably waives any and all right to trial by jury
					in any action, suit or proceeding arising out of or related to this
					Agreement.
				</p>
				<p className={'sub-header'}>
					<b>14.5 Force Majeure</b>
				</p>
				<p>
					Neither party shall be liable for any breach of this Agreement to the
					extent that such breach arises from factors outside its reasonable
					control. Customer’s subscription to the Services is predicated on
					Customer’s use of cloud computing services provided by a third party
					cloud service provider, and ACRETO will not be responsible for the
					acts or omissions of Customer’s cloud service provider.
				</p>
				<p className={'sub-header'}>
					<b>14.6 Severability</b>
				</p>
				<p>
					It is intended that this Agreement shall not violate any applicable
					law and the unenforceability or invalidity of any provision (other
					than the provisions obligating Customer to make payments to ACRETO)
					shall not affect the force and validity of the remaining provisions
					and such provisions determined to be invalid shall be deemed severed
					from this Agreement and, to the extent possible, be replaced with
					terms which as closely as possible approximate the interest and
					economic intent of such invalid provisions.
				</p>
				<br />
				<p>Last updated: July 15, 2019</p>
			</div>
			<div className={'versionId'}>
				<span>EULA Version: 1.0 </span>
				<span>ID: 234123123123123-1231-231-23-1321fasdf-123123123sadf</span>
			</div>
		</div>
	)

	renderNavbar() {
		return (
			<div className={'eula__navbar'}>
				<div className={'logo'}>
					<a href="https://acreto.io/" className="logo__normal">
						<div className="logo-img">
							<img src={logo} alt="logo_image" />
						</div>
					</a>
				</div>
				<div className={'main-panel'}>
					<Navbar className={'main-panel-content'}>
						{/*<Navbar.Collapse>
							<HeaderLinks slug={false} showSearch={true} />
						</Navbar.Collapse>*/}
					</Navbar>
				</div>
			</div>
		)
	}

	render() {
		return (
			<div className="wrapper eula-wrapper">
				<ExpiryWarning />
				{this.renderNavbar()}
				<div className={'eula--content'}>
					<div className={'eula--container'}>
						<b
							className={'title'}
						>{`End-User Licence Agreement ("Agreement")`}</b>
						{this.props.error && (
							<div className={'alert alert-danger'}>{this.props.error}</div>
						)}
						<div>{this.returnEULA()}</div>
						<div className={'buttonDiv'}>
							<p>
								<input
									type="submit"
									className={'login-button'}
									value={'I Agree'}
									onClick={() => this.props.eulaAccepted()}
								/>
							</p>
						</div>
					</div>
				</div>
				<div className={'eula--footer footer'}>
					<img
						src={LOGIN_FOOTER}
						className={cx({
							'footer--image': true,
							'slow-shake': this.props.isLoading
						})}
						alt={'footer'}
					/>
				</div>
			</div>
		)
	}
}

Eula.propTypes = {
	error: PropTypes.string.isRequired,
	isLoading: PropTypes.bool.isRequired,
	eulaAccepted: PropTypes.func.isRequired
}

Eula.defaultProps = {
	error: '',
	isLoading: false
}

const loadingSelector = createLoadingSelector(['LOGIN'])
const errorSelector = createErrorMessageSelector(['LOGIN'])

const mapStateToProps = state => {
	return {
		isLoading: loadingSelector(state),
		error: errorSelector(state)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		eulaAccepted: () => dispatch(eulaAccepted())
	}
}

const ConnectedLogin = connect(
	mapStateToProps,
	mapDispatchToProps
)(Eula)
export default withRouter(ConnectedLogin)
