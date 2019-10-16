import TerminatedIcon from './assets/img/PNG/Acreto_Icon 19.png'
import ActiveIcon from './assets/img/PNG/Acreto_Icon 20.png'
import CompletedIcon from './assets/img/PNG/Acreto_Icon 27.png'
import TimetoutIcon from './assets/img/PNG/Acreto_Icon 28.png'
import IoTIcon from './assets/img/PNG/category/IOT.png'
import CloudIcon from './assets/img/PNG/category/CloudInstance.png'
import SaasIcon from './assets/img/PNG/category/Saas.png'
import PremiseIcon from './assets/img/PNG/category/Premise.png'
import DataIcon from './assets/img/PNG/category/Datacenter.png'
import MobileIcon from './assets/img/PNG/category/MobileDevice.png'
import AppIcon from './assets/img/PNG/category/Application.png'
import ComputerIcon from './assets/img/PNG/category/Computerlaptop.png'
import AddressDetailsModal from './views/Modals/AddressDetailsModal'
import ThingDetailsModal from './views/Modals/ThingDetailsModal'
import GatewayDetailsModal from './views/Modals/GatewayDetailsModal'
import NewAddressSurvey from './views/Modals/NewAddressSurvey'
import NewThingSurvey from './views/Modals/NewThingSurvey'
import NewGatewaySurvey from './views/Modals/NewGatewaySurvey'

export const COUNTRIES = [
	{ name: 'Afghanistan', countryCode: 'af', countryCode3: 'AFG' },
	{ name: 'Aland Islands', countryCode: 'ax', countryCode3: 'ALA' },
	{ name: 'Albania', countryCode: 'al', countryCode3: 'ALB' },
	{ name: 'Algeria', countryCode: 'dz', countryCode3: 'DZA' },
	{ name: 'American Samoa', countryCode: 'as', countryCode3: 'ASM' },
	{ name: 'Andorra', countryCode: 'ad', countryCode3: 'AND' },
	{ name: 'Angola', countryCode: 'ao', countryCode3: 'AGO' },
	{ name: 'Anguilla', countryCode: 'ai', countryCode3: 'AIA' },
	{ name: 'Antigua', countryCode: 'ag', countryCode3: 'ATG' },
	{ name: 'Argentina', countryCode: 'ar', countryCode3: 'ARG' },
	{ name: 'Armenia', countryCode: 'am', countryCode3: 'ARM' },
	{ name: 'Aruba', countryCode: 'aw', countryCode3: 'ABW' },
	{ name: 'Australia', countryCode: 'au', countryCode3: 'AUS' },
	{ name: 'Austria', countryCode: 'at', countryCode3: 'AUT' },
	{ name: 'Azerbaijan', countryCode: 'az', countryCode3: 'AZE' },
	{ name: 'Bahamas', countryCode: 'bs', countryCode3: 'BHS' },
	{ name: 'Bahrain', countryCode: 'bh', countryCode3: 'BHR' },
	{ name: 'Bangladesh', countryCode: 'bd', countryCode3: 'BGD' },
	{ name: 'Barbados', countryCode: 'bb', countryCode3: 'BRB' },
	{ name: 'Belarus', countryCode: 'by', countryCode3: 'BLR' },
	{ name: 'Belgium', countryCode: 'be', countryCode3: 'BEL' },
	{ name: 'Belize', countryCode: 'bz', countryCode3: 'BLZ' },
	{ name: 'Benin', countryCode: 'bj', countryCode3: 'BEN' },
	{ name: 'Bermuda', countryCode: 'bm', countryCode3: 'BMU' },
	{ name: 'Bhutan', countryCode: 'bt', countryCode3: 'BTN' },
	{ name: 'Bolivia', countryCode: 'bo', countryCode3: 'BOL' },
	{ name: 'Bosnia', countryCode: 'ba', countryCode3: 'BIH' },
	{ name: 'Botswana', countryCode: 'bw', countryCode3: 'BWA' },
	{ name: 'Bouvet Island', countryCode: 'bv', countryCode3: 'BVT' },
	{ name: 'Brazil', countryCode: 'br', countryCode3: 'BRA' },
	{ name: 'British Virgin Islands', countryCode: 'vg', countryCode3: 'VGB' },
	{ name: 'Brunei', countryCode: 'bn', countryCode3: 'BRN' },
	{ name: 'Bulgaria', countryCode: 'bg', countryCode3: 'BGR' },
	{ name: 'Burkina Faso', countryCode: 'bf', countryCode3: 'BFA' },
	{ name: 'Burma', countryCode: 'mm', alias: 'Myanmar', countryCode3: 'MMR' },
	{ name: 'Burundi', countryCode: 'bi', countryCode3: 'BDI' },
	{ name: 'Caicos Islands', countryCode: 'tc', countryCode3: 'TCA' },
	{ name: 'Cambodia', countryCode: 'kh', countryCode3: 'KHM' },
	{ name: 'Cameroon', countryCode: 'cm', countryCode3: 'CMR' },
	{ name: 'Canada', countryCode: 'ca', countryCode3: 'CAN' },
	{ name: 'Cape Verde', countryCode: 'cv', countryCode3: 'CPV' },
	{ name: 'Cayman Islands', countryCode: 'ky', countryCode3: 'CYM' },
	{ name: 'Central African Republic', countryCode: 'cf', countryCode3: 'CAF' },
	{ name: 'Chad', countryCode: 'td', countryCode3: 'TCD' },
	{ name: 'Chile', countryCode: 'cl', countryCode3: 'CHL' },
	{ name: 'China', countryCode: 'cn', countryCode3: 'CHN' },
	{ name: 'Christmas Island', countryCode: 'cx', countryCode3: 'CXR' },
	{ name: 'Cocos Islands', countryCode: 'cc', countryCode3: 'CCK' },
	{ name: 'Colombia', countryCode: 'co', countryCode3: 'COL' },
	{ name: 'Comoros', countryCode: 'km', countryCode3: 'COM' },
	{ name: 'Congo', countryCode: 'cd', countryCode3: 'COD' },
	{ name: 'Congo Brazzaville', countryCode: 'cg', countryCode3: 'COG' },
	{ name: 'Cook Islands', countryCode: 'ck', countryCode3: 'COK' },
	{ name: 'Costa Rica', countryCode: 'cr', countryCode3: 'CRI' },
	{ name: 'Cote Divoire', countryCode: 'ci', countryCode3: 'CIV' },
	{ name: 'Croatia', countryCode: 'hr', countryCode3: 'HRV' },
	{ name: 'Cuba', countryCode: 'cu', countryCode3: 'CUB' },
	{ name: 'Cyprus', countryCode: 'cy', countryCode3: 'CYP' },
	{ name: 'Czech Republic', countryCode: 'cz', countryCode3: 'CZE' },
	{ name: 'Denmark', countryCode: 'dk', countryCode3: 'DNK' },
	{ name: 'Djibouti', countryCode: 'dj', countryCode3: 'DJI' },
	{ name: 'Dominica', countryCode: 'dm', countryCode3: 'DMA' },
	{ name: 'Dominican Republic', countryCode: 'do', countryCode3: 'DOM' },
	{ name: 'Ecuador', countryCode: 'ec', countryCode3: 'ECU' },
	{ name: 'Egypt', countryCode: 'eg', countryCode3: 'EGY' },
	{ name: 'El Salvador', countryCode: 'sv', countryCode3: 'SLV' },
	{ name: 'Equatorial Guinea', countryCode: 'gq', countryCode3: 'GNQ' },
	{ name: 'Eritrea', countryCode: 'er', countryCode3: 'ERI' },
	{ name: 'Estonia', countryCode: 'ee', countryCode3: 'EST' },
	{ name: 'Ethiopia', countryCode: 'et', countryCode3: 'ETH' },
	{ name: 'Europeanunion', countryCode: 'eu' },
	{ name: 'Falkland Islands', countryCode: 'fk', countryCode3: 'FLK' },
	{ name: 'Faroe Islands', countryCode: 'fo', countryCode3: 'FRO' },
	{ name: 'Fiji', countryCode: 'fj', countryCode3: 'FJI' },
	{ name: 'Finland', countryCode: 'fi', countryCode3: 'FIN' },
	{ name: 'France', countryCode: 'fr', countryCode3: 'FRA' },
	{ name: 'French Guiana', countryCode: 'gf', countryCode3: 'GUF' },
	{ name: 'French Polynesia', countryCode: 'pf', countryCode3: 'PYF' },
	{ name: 'French Territories', countryCode: 'tf', countryCode3: 'ATF' },
	{ name: 'Gabon', countryCode: 'ga', countryCode3: 'GAB' },
	{ name: 'Gambia', countryCode: 'gm', countryCode3: 'GMB' },
	{ name: 'Georgia', countryCode: 'ge', countryCode3: 'GEO' },
	{ name: 'Germany', countryCode: 'de', countryCode3: 'DEU' },
	{ name: 'Ghana', countryCode: 'gh', countryCode3: 'GHA' },
	{ name: 'Gibraltar', countryCode: 'gi', countryCode3: 'GIB' },
	{ name: 'Greece', countryCode: 'gr', countryCode3: 'GRC' },
	{ name: 'Greenland', countryCode: 'gl', countryCode3: 'GRL' },
	{ name: 'Grenada', countryCode: 'gd', countryCode3: 'GRD' },
	{ name: 'Guadeloupe', countryCode: 'gp', countryCode3: 'GLP' },
	{ name: 'Guam', countryCode: 'gu', countryCode3: 'GUM' },
	{ name: 'Guatemala', countryCode: 'gt', countryCode3: 'GTM' },
	{ name: 'Guinea', countryCode: 'gn', countryCode3: 'GIN' },
	{ name: 'Guinea-Bissau', countryCode: 'gw', countryCode3: 'GNB' },
	{ name: 'Guyana', countryCode: 'gy', countryCode3: 'GUY' },
	{ name: 'Haiti', countryCode: 'ht', countryCode3: 'HTI' },
	{ name: 'Heard Island', countryCode: 'hm', countryCode3: 'HMD' },
	{ name: 'Honduras', countryCode: 'hn', countryCode3: 'HND' },
	{ name: 'Hong Kong', countryCode: 'hk', countryCode3: 'HKG' },
	{ name: 'Hungary', countryCode: 'hu', countryCode3: 'HUN' },
	{ name: 'Iceland', countryCode: 'is', countryCode3: 'ISL' },
	{ name: 'India', countryCode: 'in', countryCode3: 'IND' },
	{ name: 'Indian Ocean Territory', countryCode: 'io', countryCode3: 'IOT' },
	{ name: 'Indonesia', countryCode: 'id', countryCode3: 'IDN' },
	{ name: 'Iran', countryCode: 'ir', countryCode3: 'IRN' },
	{ name: 'Iraq', countryCode: 'iq', countryCode3: 'IRQ' },
	{ name: 'Ireland', countryCode: 'ie', countryCode3: 'IRL' },
	{ name: 'Israel', countryCode: 'il', countryCode3: 'ISR' },
	{ name: 'Italy', countryCode: 'it', countryCode3: 'ITA' },
	{ name: 'Jamaica', countryCode: 'jm', countryCode3: 'JAM' },
	{
		name: 'Jan Mayen',
		countryCode: 'sj',
		alias: 'Svalbard',
		countryCode3: 'SJM'
	},
	{ name: 'Japan', countryCode: 'jp', countryCode3: 'JPN' },
	{ name: 'Jordan', countryCode: 'jo', countryCode3: 'JOR' },
	{ name: 'Kazakhstan', countryCode: 'kz', countryCode3: 'KAZ' },
	{ name: 'Kenya', countryCode: 'ke', countryCode3: 'KEN' },
	{ name: 'Kiribati', countryCode: 'ki', countryCode3: 'KIR' },
	{ name: 'Kuwait', countryCode: 'kw', countryCode3: 'KWT' },
	{ name: 'Kyrgyzstan', countryCode: 'kg', countryCode3: 'KGZ' },
	{ name: 'Laos', countryCode: 'la', countryCode3: 'LAO' },
	{ name: 'Latvia', countryCode: 'lv', countryCode3: 'LVA' },
	{ name: 'Lebanon', countryCode: 'lb', countryCode3: 'LBN' },
	{ name: 'Lesotho', countryCode: 'ls', countryCode3: 'LSO' },
	{ name: 'Liberia', countryCode: 'lr', countryCode3: 'LBR' },
	{ name: 'Libya', countryCode: 'ly', countryCode3: 'LBY' },
	{ name: 'Liechtenstein', countryCode: 'li', countryCode3: 'LIE' },
	{ name: 'Lithuania', countryCode: 'lt', countryCode3: 'LTU' },
	{ name: 'Luxembourg', countryCode: 'lu', countryCode3: 'LUX' },
	{ name: 'Macau', countryCode: 'mo', countryCode3: 'MAC' },
	{ name: 'Macedonia', countryCode: 'mk', countryCode3: 'MKD' },
	{ name: 'Madagascar', countryCode: 'mg', countryCode3: 'MDG' },
	{ name: 'Malawi', countryCode: 'mw', countryCode3: 'MWI' },
	{ name: 'Malaysia', countryCode: 'my', countryCode3: 'MYS' },
	{ name: 'Maldives', countryCode: 'mv', countryCode3: 'MDV' },
	{ name: 'Mali', countryCode: 'ml', countryCode3: 'MLI' },
	{ name: 'Malta', countryCode: 'mt', countryCode3: 'MLT' },
	{ name: 'Marshall Islands', countryCode: 'mh', countryCode3: 'MHL' },
	{ name: 'Martinique', countryCode: 'mq', countryCode3: 'MTQ' },
	{ name: 'Mauritania', countryCode: 'mr', countryCode3: 'MRT' },
	{ name: 'Mauritius', countryCode: 'mu', countryCode3: 'MUS' },
	{ name: 'Mayotte', countryCode: 'yt', countryCode3: 'MYT' },
	{ name: 'Mexico', countryCode: 'mx', countryCode3: 'MEX' },
	{ name: 'Micronesia', countryCode: 'fm', countryCode3: 'FSM' },
	{ name: 'Moldova', countryCode: 'md', countryCode3: 'MDA' },
	{ name: 'Monaco', countryCode: 'mc', countryCode3: 'MCO' },
	{ name: 'Mongolia', countryCode: 'mn', countryCode3: 'MNG' },
	{ name: 'Montenegro', countryCode: 'me', countryCode3: 'MNE' },
	{ name: 'Montserrat', countryCode: 'ms', countryCode3: 'MSR' },
	{ name: 'Morocco', countryCode: 'ma', countryCode3: 'MAR' },
	{ name: 'Mozambique', countryCode: 'mz', countryCode3: 'MOZ' },
	{ name: 'Namibia', countryCode: 'na', countryCode3: 'NAM' },
	{ name: 'Nauru', countryCode: 'nr', countryCode3: 'NRU' },
	{ name: 'Nepal', countryCode: 'np', countryCode3: 'NPL' },
	{ name: 'Netherlands', countryCode: 'nl', countryCode3: 'NLD' },
	{ name: 'Netherlandsantilles', countryCode: 'an' },
	{ name: 'New Caledonia', countryCode: 'nc', countryCode3: 'NCL' },
	{ name: 'New Guinea', countryCode: 'pg', countryCode3: 'PNG' },
	{ name: 'New Zealand', countryCode: 'nz', countryCode3: 'NZL' },
	{ name: 'Nicaragua', countryCode: 'ni', countryCode3: 'NIC' },
	{ name: 'Niger', countryCode: 'ne', countryCode3: 'NER' },
	{ name: 'Nigeria', countryCode: 'ng', countryCode3: 'NGA' },
	{ name: 'Niue', countryCode: 'nu', countryCode3: 'NIU' },
	{ name: 'Norfolk Island', countryCode: 'nf', countryCode3: 'NFK' },
	{ name: 'North Korea', countryCode: 'kp', countryCode3: 'PRK' },
	{ name: 'Northern Mariana Islands', countryCode: 'mp', countryCode3: 'MNP' },
	{ name: 'Norway', countryCode: 'no', countryCode3: 'NOR' },
	{ name: 'Oman', countryCode: 'om', countryCode3: 'OMN' },
	{ name: 'Pakistan', countryCode: 'pk', countryCode3: 'PAK' },
	{ name: 'Palau', countryCode: 'pw', countryCode3: 'PLW' },
	{ name: 'Palestine', countryCode: 'ps', countryCode3: 'PSE' },
	{ name: 'Panama', countryCode: 'pa', countryCode3: 'PAN' },
	{ name: 'Paraguay', countryCode: 'py', countryCode3: 'PRY' },
	{ name: 'Peru', countryCode: 'pe', countryCode3: 'PER' },
	{ name: 'Philippines', countryCode: 'ph', countryCode3: 'PHL' },
	{ name: 'Pitcairn Islands', countryCode: 'pn', countryCode3: 'PCN' },
	{ name: 'Poland', countryCode: 'pl', countryCode3: 'POL' },
	{ name: 'Portugal', countryCode: 'pt', countryCode3: 'PRT' },
	{ name: 'Puerto Rico', countryCode: 'pr', countryCode3: 'PRI' },
	{ name: 'Qatar', countryCode: 'qa', countryCode3: 'QAT' },
	{ name: 'Reunion', countryCode: 're', countryCode3: 'REU' },
	{ name: 'Romania', countryCode: 'ro', countryCode3: 'ROU' },
	{ name: 'Russia', countryCode: 'ru', countryCode3: 'RUS' },
	{ name: 'Rwanda', countryCode: 'rw', countryCode3: 'RWA' },
	{ name: 'Saint Helena', countryCode: 'sh', countryCode3: 'SHN' },
	{ name: 'Saint Kitts and Nevis', countryCode: 'kn', countryCode3: 'KNA' },
	{ name: 'Saint Lucia', countryCode: 'lc', countryCode3: 'LCA' },
	{ name: 'Saint Pierre', countryCode: 'pm', countryCode3: 'SPM' },
	{ name: 'Saint Vincent', countryCode: 'vc', countryCode3: 'VCT' },
	{ name: 'Samoa', countryCode: 'ws', countryCode3: 'WSM' },
	{ name: 'San Marino', countryCode: 'sm', countryCode3: 'SMR' },
	{ name: 'Sandwich Islands', countryCode: 'gs', countryCode3: 'SGS' },
	{ name: 'Sao Tome', countryCode: 'st', countryCode3: 'STP' },
	{ name: 'Saudi Arabia', countryCode: 'sa', countryCode3: 'SAU' },
	{ name: 'Scotland', countryCode: 'gb sct' },
	{ name: 'Senegal', countryCode: 'sn', countryCode3: 'SEN' },
	{ name: 'Serbia', countryCode: 'cs' },
	{ name: 'Serbia', countryCode: 'rs', countryCode3: 'SRB' },
	{ name: 'Seychelles', countryCode: 'sc', countryCode3: 'SYC' },
	{ name: 'Sierra Leone', countryCode: 'sl', countryCode3: 'SLE' },
	{ name: 'Singapore', countryCode: 'sg', countryCode3: 'SGP' },
	{ name: 'Slovakia', countryCode: 'sk', countryCode3: 'SVK' },
	{ name: 'Slovenia', countryCode: 'si', countryCode3: 'SVN' },
	{ name: 'Solomon Islands', countryCode: 'sb', countryCode3: 'SLB' },
	{ name: 'Somalia', countryCode: 'so', countryCode3: 'SOM' },
	{ name: 'South Africa', countryCode: 'za', countryCode3: 'ZAF' },
	{ name: 'South Korea', countryCode: 'kr', countryCode3: 'KOR' },
	{ name: 'Spain', countryCode: 'es', countryCode3: 'ESP' },
	{ name: 'Sri Lanka', countryCode: 'lk', countryCode3: 'LKA' },
	{ name: 'Sudan', countryCode: 'sd', countryCode3: 'SDN' },
	{ name: 'Suriname', countryCode: 'sr', countryCode3: 'SUR' },
	{ name: 'Swaziland', countryCode: 'sz', countryCode3: 'SWZ' },
	{ name: 'Sweden', countryCode: 'se', countryCode3: 'SWE' },
	{ name: 'Switzerland', countryCode: 'ch', countryCode3: 'CHE' },
	{ name: 'Syria', countryCode: 'sy', countryCode3: 'SYR' },
	{ name: 'Taiwan', countryCode: 'tw', countryCode3: 'TWN' },
	{ name: 'Tajikistan', countryCode: 'tj', countryCode3: 'TJK' },
	{ name: 'Tanzania', countryCode: 'tz', countryCode3: 'TZA' },
	{ name: 'Thailand', countryCode: 'th', countryCode3: 'THA' },
	{ name: 'Timorleste', countryCode: 'tl', countryCode3: 'TLS' },
	{ name: 'Togo', countryCode: 'tg', countryCode3: 'TGO' },
	{ name: 'Tokelau', countryCode: 'tk', countryCode3: 'TKL' },
	{ name: 'Tonga', countryCode: 'to', countryCode3: 'TON' },
	{ name: 'Trinidad', countryCode: 'tt', countryCode3: 'TTO' },
	{ name: 'Tunisia', countryCode: 'tn', countryCode3: 'TUN' },
	{ name: 'Turkey', countryCode: 'tr', countryCode3: 'TUR' },
	{ name: 'Turkmenistan', countryCode: 'tm', countryCode3: 'TKM' },
	{ name: 'Tuvalu', countryCode: 'tv', countryCode3: 'TUV' },
	{
		name: 'U.A.E.',
		countryCode: 'ae',
		alias: 'United Arab Emirates',
		countryCode3: 'ARE'
	},
	{ name: 'Uganda', countryCode: 'ug', countryCode3: 'UGA' },
	{ name: 'Ukraine', countryCode: 'ua', countryCode3: 'UKR' },
	{
		name: 'United Kingdom',
		countryCode: 'gb',
		alias: 'uk',
		countryCode3: 'GBR'
	},
	{
		name: 'United States',
		countryCode: 'us',
		alias: 'America',
		countryCode3: 'USA'
	},
	{ name: 'Uruguay', countryCode: 'uy', countryCode3: 'URY' },
	{ name: 'US Minor Islands', countryCode: 'um', countryCode3: 'UMI' },
	{ name: 'US Virgin Islands', countryCode: 'vi', countryCode3: 'VIR' },
	{ name: 'Uzbekistan', countryCode: 'uz', countryCode3: 'UZB' },
	{ name: 'Vanuatu', countryCode: 'vu', countryCode3: 'VUT' },
	{ name: 'Vatican City', countryCode: 'va', countryCode3: 'VAT' },
	{ name: 'Venezuela', countryCode: 've', countryCode3: 'VEN' },
	{ name: 'Vietnam', countryCode: 'vn', countryCode3: 'VNM' },
	{ name: 'Wales', countryCode: 'gb wls' },
	{ name: 'Wallis and Futuna', countryCode: 'wf', countryCode3: 'WLF' },
	{ name: 'Western Sahara', countryCode: 'eh', countryCode3: 'ESH' },
	{ name: 'Yemen', countryCode: 'ye', countryCode3: 'YEM' },
	{ name: 'Zambia', countryCode: 'zm', countryCode3: 'ZMB' },
	{ name: 'Zimbabwe', countryCode: 'zw', countryCode3: 'ZWE' }
]

export const REPORT_TABLE_FIELDS = [
	{ name: 'Time / Date', center: false, flex: '1 0' },
	{ name: 'Source', center: false, flex: '1.25 0' },
	{ name: 'Service', center: false, flex: '1 0' },
	{ name: 'Application', center: false, flex: '1 0' },
	{ name: 'Destination', center: false, flex: '1.25 0' },
	{ name: 'Actions', center: false, flex: '0.75 0' },
	{ name: 'Condition', center: false, flex: '1 0' },
	{ name: 'Stats', center: false, flex: '1.5 0' }
]

export const REPORT_STATUSES = [
	{ slug: 'active', name: 'Active', icon: ActiveIcon },
	{ slug: 'completed', icon: CompletedIcon, name: 'Completed' },
	{ slug: 'terminated', icon: TerminatedIcon, name: 'Terminated' },
	{ slug: 'timeout', icon: TimetoutIcon, name: 'Timed out' }
]

export const OBJECT_TABLE_FIELDS = [
	{ name: 'Object', center: false },
	{ name: 'Profile Group', center: false },
	{ name: 'NSP', center: false },
	{ name: 'Status', center: false }
]

export const POLICY_TABLE_FIELDS = [
	{ name: 'Policy', center: false },
	{ name: 'Source', center: false },
	{ name: 'Service', center: false },
	{ name: 'Application', center: false },
	{ name: 'Destination', center: false },
	{ name: 'Actions', center: false }
]

/*
export const OBJECT_TYPES_CONFIG = [
	{
		name: 'thing',
		urlType: 'devices',
		title: 'Create New Thing',
		createComponent: NewThingSurvey,
		detailComponent: ThingDetailsModal
	},
	{
		name: 'gateway',
		urlType: 'gateways',
		title: 'Create New Gateway',
		createComponent: NewGatewaySurvey,
		detailComponent: GatewayDetailsModal
	},
	{
		name: 'address',
		urlType: 'addresses',
		title: 'Create New Address',
		createComponent: NewAddressSurvey,
		detailComponent: AddressDetailsModal
	}
]
*/

export const OBJECT_TYPES_CONFIG = [
	{
		name: 'thing',
		urlType: 'devices',
		title: 'Create New Thing',
		createComponent: NewThingSurvey,
		detailComponent: ThingDetailsModal
	},
	{
		name: 'gateway',
		urlType: 'gateways',
		title: 'Create New Gateway',
		createComponent: NewGatewaySurvey,
		detailComponent: GatewayDetailsModal
	},
	{
		name: 'address',
		urlType: 'addresses',
		title: 'Create New Address',
		createComponent: NewAddressSurvey,
		detailComponent: AddressDetailsModal
	}
]

export const OBJECT_CATEGORIES = [
	{ label: 'IoT', value: 'IoT', icon: IoTIcon },
	{ label: 'Cloud Instance', value: 'Cloud Instance', icon: CloudIcon },
	{ label: 'Saas', value: 'Saas', icon: SaasIcon },
	{ label: 'Premise', value: 'Premise', icon: PremiseIcon },
	{ label: 'Data Center', value: 'Data Center', icon: DataIcon },
	{ label: 'Mobile Device', value: 'Mobile Device', icon: MobileIcon },
	{ label: 'Application', value: 'Application', icon: AppIcon },
	{ label: 'Computer / Laptop', value: 'Computer / Laptop', icon: ComputerIcon }
]

export const OBJECT_TYPES = [
	{ label: 'Thing', value: 'thing' },
	{ label: 'Address', value: 'address' },
	{ label: 'IPSec', value: 'gateway' }
]

export const OBJECT_ASSET_VALUES = Array.from(Array(101).keys()).map(n => ({
	label: String(n),
	value: n
}))

export const EXPIRATION_TYPE = {
	HARD: 0,
	SOFT: 1
}

export const EXPIRATION_TYPE_OPTIONS = [
	{ value: EXPIRATION_TYPE.HARD, label: 'Hard' },
	{ value: EXPIRATION_TYPE.SOFT, label: 'Soft' }
]

export const LOCATION_TYPE = {
	AUTO: 0,
	REGION: 1,
	COORDINATES: 2
}

export const LOCATION_TYPE_OPTIONS = [
	{ label: 'Auto', value: LOCATION_TYPE.AUTO },
	{ label: 'Region', value: LOCATION_TYPE.REGION },
	{ label: 'Coordinates', value: LOCATION_TYPE.COORDINATES }
]

export const AVAILABLE_REGIONS = [
	{ label: 'US East', value: 0 },
	{ label: 'US West', value: 1 },
	{ label: 'US Central', value: 2 },
	{ label: 'SA East', value: 3 }
]

export const GATEWAY_TYPE = {
	vGATEWAY: 0,
	IPSEC: 1
}
export const GATEWAY_TYPE_OPTIONS = [
	{ value: GATEWAY_TYPE.IPSEC, label: 'IPSEC' }
]

export const IP_TYPE = {
	IPv4: 'ipv4',
	IPv6: 'ipv6',
	FQDN: 'fqdn'
}

export const IP_TYPE_OPTIONS = [
	{ value: IP_TYPE.IPv4, label: 'IPv4' },
	{ value: IP_TYPE.IPv6, label: 'IPv6' },
	{ value: IP_TYPE.FQDN, label: 'FQDN' }
]

export const IP_MODES = {
	DHCP: 0,
	Static: 1
}
export const IP_MODES_OPTIONS = [
	{ value: IP_MODES.DHCP, label: 'DHCP' },
	{ value: IP_MODES.Static, label: 'Static' }
]

export const MASKS_V4 = Array.from(Array(32), (x, index) => {
	return { value: index + 1, label: `${index + 1}` }
})

export const MASKS_V6 = Array.from(Array(128), (x, index) => {
	return { value: index + 1, label: `${index + 1}` }
})

export const ADDRESS_TYPE = {
	INTERNAL: 0,
	EXTERNAL: 1
}

export const ADDRESS_TYPES_OPTIONS = [
	{ value: ADDRESS_TYPE.INTERNAL, label: 'Internal' },
	{ value: ADDRESS_TYPE.EXTERNAL, label: 'External' }
]

export const ACTION_TYPES = {
	ALLOW: 0,
	DENY: 1
}

export const ACTION_TYPES_OPTIONS = [
	{ value: ACTION_TYPES.ALLOW, label: 'Allow' },
	{ value: ACTION_TYPES.DENY, label: 'Deny' }
]

export const ADDRESS_TRANSLATION_TYPES = {
	DISABLE: 0,
	ENABLE: 1
}

export const ADDRESS_TRANSLATION_OPTIONS = [
	{ value: ADDRESS_TRANSLATION_TYPES.ENABLE, label: 'Enable' },
	{ value: ADDRESS_TRANSLATION_TYPES.DISABLE, label: 'Disable' }
]

export const MOCK_OPTIONS = [
	{ value: 0, label: 'I' },
	{ value: 1, label: 'need' },
	{ value: 2, label: 'someone' },
	{ value: 3, label: 'to' },
	{ value: 4, label: 'define' },
	{ value: 5, label: 'options' }
]

export const PROTOCOL = [
	{ value: 'tcp', label: 'tcp' },
	{ value: 'udp', label: 'udp' },
	{ value: 'icmp', label: 'icmp' }
]

export const LOCAL_ACCESS_TOKEN_KEY = 'wedge_access_token'
export const LOCAL_ACCESS_TOKEN_EXPIRY_TIME = 'wedge_token_expiry_time'
export const LOCAL_CUSTOMER_KEY = 'wedge_customer_key'
