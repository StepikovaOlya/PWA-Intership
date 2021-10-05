import React, {Suspense} from 'react';
import { bool, shape, string } from 'prop-types';
import { useScrollLock } from '@magento/peregrine';

import { useStyle } from '@magento/venia-ui/lib/classify';
import Footer from '../Footer';
import Header from '@magento/venia-ui/lib/components/Header';
import defaultClasses from './main.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import SwiperCore, { Autoplay, Keyboard, Mousewheel, Navigation, Pagination, Scrollbar } from 'swiper/core';
import {useIntl} from "react-intl";
SwiperCore.use([ Autoplay, Keyboard, Mousewheel, Navigation, Pagination, Scrollbar ]);



const Main = props => {
    const { children, isMasked } = props;
    const classes = useStyle(defaultClasses, props.classes);

    const rootClass = isMasked ? classes.root_masked : classes.root;
    const pageClass = isMasked ? classes.page_masked : classes.page;

    useScrollLock(isMasked);

    return (
        <main className={rootClass}>
            <Header />
            <div className={pageClass}>{children}
                <div className={classes.title}>Slider Swiper - export components</div>
                <Swiper
                    spaceBetween={0}
                    slidesPerView={1}
                    pagination={{ clickable: true }}
                    autoplay
                    // navigation
                    // scrollbar={{ draggable: true }}
                >
                    <SwiperSlide className="clearance"> </SwiperSlide>
                    <SwiperSlide className="armchair"> </SwiperSlide>
                </Swiper>
            </div>
            <Footer />
        </main>
    );
};

export default Main;

Main.propTypes = {
    classes: shape({
        page: string,
        page_masked: string,
        root: string,
        root_masked: string
    }),
    isMasked: bool
};

