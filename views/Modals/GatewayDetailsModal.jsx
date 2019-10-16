/* eslint-disable react/no-string-refs */
/* eslint-disable react/no-find-dom-node */
import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Card from '../../components/Card/Card'
import Field from '../../components/Field/Field'
import Translator from '../../utils/enumTranslator'
import { DropdownButton, MenuItem } from 'react-bootstrap'
import ReactTooltip from 'react-tooltip'
import { findDOMNode } from 'react-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import 'leaflet/dist/leaflet.css'
import './modals.scss'

/*
const configOptions = [
	'Strongswan configuration',
	'Cisco configuration',
	'Orange PI image (100 MB)',
	'Raspberry Pi PC Plus image (200 MB)'
]*/

class GatewayDetailsModal extends React.Component {
	onDownload = () => {
		this.props.onDownload()
	}

	onGetLink = () => {
		this.props.onGetLink()
	}

	render() {
		const { data, configLink } = this.props
		const type = Translator.type(data.element)
		const category = Translator.category(data.category)

		return (
			<React.Fragment>
				<div className={'modal__content padded new-gateway-survey'}>
					<Card header={false}>
						<div className={'form-row'}>
							<Field.Group label={'Name'} secondaryLabel={data.gateway_type}>
								<Field.Text text={data.name} />
							</Field.Group>
						</div>
						<div className={'form-row'}>
							<Field.Group label={'Category / Type'}>
								<Field.Text text={`${category.label} / ${type.label}`} />
							</Field.Group>
						</div>
					</Card>

					<Card header={false}>
						<div className={'space-above'}>
							<Field.Group label={'Gateway IP'} full center={true}>
								<Field.Text text={`${data.peerAddress}`} />
							</Field.Group>
						</div>
						<div className={'space-above'}>
							<Field.Group self label={'Additional Local Networks'}>
								<div className={'local-networks--container'}>
									<table>
										<tbody>
											<tr>
												<th className={'network'}>Network</th>
											</tr>
											{data.peerNetworks.map((net, index) => (
												<tr key={`additional-network-index-${index}`}>
													<td className={'network'}>{net}</td>
												</tr>
											))}
										</tbody>
									</table>
								</div>
							</Field.Group>
						</div>
					</Card>
				</div>
				<div className={'wedge-modal__footer download__config'}>
					<DropdownButton
						bsStyle={'primary'}
						title={'Download'}
						noCaret
						dropup
						pullRight
						onClick={this.onGetLink}
					>
						<MenuItem>
							<div className={'config-down'}>
								{'Strongswan configuration'}
								<i
									className={'config-download material-icons-outlined'}
									onClick={this.onDownload}
								>
									{'cloud_download'}
								</i>
								<button className={'copy-button'}>
									<CopyToClipboard
										text={configLink}
										onCopy={() => {
											ReactTooltip.show(findDOMNode(this.refs.foo))
										}}
									>
										<i
											className={'config-copy fa fa-clone fa-flip-horizontal'}
										/>
									</CopyToClipboard>
								</button>
								<span ref="foo" data-tip="Copied!" data-for="tooltip" />
								<ReactTooltip
									id="tooltip"
									delayHide={1000}
									type="info"
									afterShow={() =>
										ReactTooltip.hide(findDOMNode(this.refs.foo))
									}
								/>
							</div>
						</MenuItem>
					</DropdownButton>
				</div>
			</React.Fragment>
		)
	}
}

GatewayDetailsModal.propTypes = {
	data: PropTypes.object.isRequired,
	onDownload: PropTypes.func.isRequired,
	onGetLink: PropTypes.func.isRequired,
	configLink: PropTypes.string.isRequired
}

const mapStateToProps = state => {
	return {
		configLink: state.objects.configLink
	}
}

export default connect(mapStateToProps)(GatewayDetailsModal)
