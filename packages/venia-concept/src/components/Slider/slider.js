import React, { Children } from 'react';
import { arrayOf, bool, number, oneOf, shape, string } from 'prop-types';
import defaultClasses from './slider.css';
import { useStyle } from '@magento/venia-ui/lib/classify';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import SwiperCore, { Autoplay, Keyboard, Mousewheel, Navigation, Pagination } from 'swiper/core';
SwiperCore.use([ Autoplay, Keyboard, Mousewheel, Navigation, Pagination ]);

/**
 * Override Page Builder Slider component.
 *
 * This component is part of the Page Builder / PWA integration. It can be consumed without Page Builder.
 *
 * @typedef Slider
 * @kind functional component
 *
 * @param {props} props React component props
 *
 * @returns {React.Element} A React component that displays a Slider which contains slides.
 */

const Slider = props => {
    /* console.log(props); - properties that come from the object */
    const classes = useStyle(defaultClasses, props.classes);

    const {
        autoplay,
        autoplaySpeed,
        children,
        cssClasses = [],
        border,
        borderColor,
        borderWidth,
        borderRadius,
        fade,
        infinite,
        marginBottom,
        marginLeft,
        marginRight,
        marginTop,
        minHeight,
        paddingBottom,
        paddingLeft,
        paddingRight,
        paddingTop,
        showArrows,
        showDots,
        textAlign
    } = props;

    const dynamicStyles = {
        border,
        borderColor,
        borderRadius,
        borderWidth,
        textAlign,
        marginBottom,
        marginLeft,
        marginRight,
        marginTop,
        minHeight,
        paddingBottom,
        paddingLeft,
        paddingRight,
        paddingTop
    };

    const jarallaxInstances = {};
    const sliderSettings = {
        autoplay: autoplay ? { delay: autoplaySpeed ? autoplaySpeed : 5000 } : false,
        loop: infinite ? 'infinite' : '',
        navigation: showArrows,
        pagination: { clickable: showDots }
    };

    // Override classes on banner to ensure min height is respected
    Children.map(children, (child, index) => {
        if (child.props && child.props.data) {
            child.props.data.classes = {
                root: classes.bannerRoot,
                link: classes.bannerLink,
                wrapper: classes.bannerWrapper,
                posterOverlay: classes.bannerPosterOverlay
            };
            child.props.data.getParallax = (element, options) => {
                jarallaxInstances[index] = {
                    element,
                    options
                };
            };
        }
        return child;
    });

    return (
        <div className={[classes.root, ...cssClasses].join(' ')} style={dynamicStyles}>
            <Swiper {...sliderSettings}>
                {children.map((item, index) => (
                    <SwiperSlide key={index}>
                        {item}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

/**
 * Props for {@link Slider}
 *
 * @typedef props
 *
 * @property {Object} classes An object containing the class names for the Slider
 * @property {String} classes.root CSS class for the slider root element
 * @property {String} classes.bannerRoot CSS class for the child banner item
 * @property {String} classes.bannerLink CSS class for the child banner item
 * @property {String} classes.bannerWrapper CSS class for the child banner item
 * @property {String} classes.bannerPosterOverlay CSS class for the child banner item
 * @property {String} minHeight CSS minimum height property
 * @property {String} autoplay Whether the slider should autoplay
 * @property {String} autoplaySpeed The speed at which the autoplay should move the slide on
 * @property {String} fade Fade between slides
 * @property {String} infinite Whether to infinitely scroll the slider
 * @property {String} showArrows Whether to show arrows on the slide for navigation
 * @property {String} showDots Whether to show navigation dots at the bottom of the slider
 * @property {String} textAlign Alignment of content within the slider
 * @property {String} border CSS border property
 * @property {String} borderColor CSS border color property
 * @property {String} borderWidth CSS border width property
 * @property {String} borderRadius CSS border radius property
 * @property {String} marginTop CSS margin top property
 * @property {String} marginRight CSS margin right property
 * @property {String} marginBottom CSS margin bottom property
 * @property {String} marginLeft CSS margin left property
 * @property {String} paddingTop CSS padding top property
 * @property {String} paddingRight CSS padding right property
 * @property {String} paddingBottom CSS padding bottom property
 * @property {String} paddingLeft CSS padding left property
 * @property {Array} cssClasses List of CSS classes to be applied to the component
 */
Slider.propTypes = {
    appearance: oneOf(['default']),
    autoplay: bool,
    autoplaySpeed: number,
    cssClasses: arrayOf(string),
    classes: shape({
        root: string,
        bannerRoot: string,
        bannerLink: string,
        bannerWrapper: string,
        bannerPosterOverlay: string
    }),
    border: string,
    borderColor: string,
    borderRadius: string,
    borderWidth: string,
    fade: bool,
    infinite: bool,
    marginBottom: string,
    marginLeft: string,
    marginRight: string,
    marginTop: string,
    minHeight: string,
    paddingBottom: string,
    paddingLeft: string,
    paddingRight: string,
    paddingTop: string,
    showArrows: bool,
    showDots: bool,
    textAlign: string
};

export default Slider;
