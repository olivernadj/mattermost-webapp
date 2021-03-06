// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {Tooltip} from 'react-bootstrap';
import {FormattedMessage, IntlShape, injectIntl} from 'react-intl';

import MenuWrapper from 'components/widgets/menu/menu_wrapper';
import Menu from 'components/widgets/menu/menu';
import OverlayTrigger from 'components/overlay_trigger';

type Props = {
    intl: IntlShape;
    canCreateChannel: boolean;
    canJoinPublicChannel: boolean;
    showMoreChannelsModal: () => void;
    showNewChannelModal: () => void;
};

type State = {

};

class AddChannelDropdown extends React.PureComponent<Props, State> {
    renderDropdownItems = () => {
        const {intl, canCreateChannel, canJoinPublicChannel} = this.props;

        let joinPublicChannel;
        if (canJoinPublicChannel) {
            joinPublicChannel = (
                <Menu.ItemAction
                    id='showMoreChannels'
                    onClick={this.props.showMoreChannelsModal}
                    icon={<i className='icon-globe'/>}
                    text={intl.formatMessage({id: 'sidebar_left.add_channel_dropdown.browseChannels', defaultMessage: 'Browse Channels'})}
                />
            );
        }

        let createChannel;
        if (canCreateChannel) {
            createChannel = (
                <Menu.ItemAction
                    id='showNewChannel'
                    onClick={this.props.showNewChannelModal}
                    icon={<i className='icon-plus'/>}
                    text={intl.formatMessage({id: 'sidebar_left.add_channel_dropdown.createNewChannel', defaultMessage: 'Create New Channel'})}
                />
            );
        }

        return (
            <Menu.Group>
                {joinPublicChannel}
                {createChannel}
            </Menu.Group>
        );
    }

    render() {
        const {intl, canCreateChannel, canJoinPublicChannel} = this.props;

        if (!(canCreateChannel || canJoinPublicChannel)) {
            return null;
        }

        const tooltip = (
            <Tooltip
                id='new-group-tooltip'
                className='hidden-xs'
            >
                <FormattedMessage
                    id={'sidebar_left.add_channel_dropdown.browseOrCreateChannels'}
                    defaultMessage='Browse or create channels'
                />
            </Tooltip>
        );

        return (
            <MenuWrapper className='AddChannelDropdown'>
                <button
                    className='AddChannelDropdown_dropdownButton'
                    aria-label={intl.formatMessage({id: 'sidebar_left.add_channel_dropdown.dropdownAriaLabel', defaultMessage: 'Add Channel Dropdown'})}
                >
                    <OverlayTrigger
                        delayShow={500}
                        placement='top'
                        overlay={tooltip}
                    >
                        <i className='icon-plus'/>
                    </OverlayTrigger>
                </button>
                <Menu
                    id='AddChannelDropdown'
                    ariaLabel={intl.formatMessage({id: 'sidebar_left.add_channel_dropdown.dropdownAriaLabel', defaultMessage: 'Add Channel Dropdown'})}
                >
                    {this.renderDropdownItems()}
                </Menu>
            </MenuWrapper>
        );
    }
}

export default injectIntl(AddChannelDropdown);
