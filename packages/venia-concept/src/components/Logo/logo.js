import React from 'react';
import { useIntl } from 'react-intl';
import { number, shape, string } from 'prop-types';
import { useStyle } from '@magento/venia-ui/lib/classify';
import Image from '@magento/venia-ui/lib/components/Image';
import logoImages from '../../images/logo/logo.png';

const Logo = props => {
    const { logo } = props;
    const classes = useStyle({}, props.classes);
    const { formatMessage } = useIntl();
    const title = formatMessage({ id: 'logo.title', defaultMessage: 'Drexel' });

    return (
        <Image
            alt={logo.logo_alt ? logo.logo_alt : title}
            classes={{ image: classes.logo }}
            height={logo.logo_height ? logo.logo_height : 46}
            src={logo.header_logo_src ? '/media/logo/' + logo.header_logo_src : logoImages}
            title={logo.logo_alt ? logo.logo_alt : title}
            width={logo.logo_width ? logo.logo_width : 176}
        />
    );
};

Logo.propTypes = {
    classes: shape({
        logo: string
    }),
    logo: shape({
        logo_alt: string,
        logo_width: number,
        logo_height: number,
        header_logo_src: string
    })
};


export default Logo;
