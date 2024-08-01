import React from "react";
import { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from '@emotion/styled';
import TinderCard from 'react-tinder-card';

import './styles.css';

const BackgroundDiv = styled.div<{ backgroundImage: string }>`
    background-image: url(${props => props.backgroundImage});
    //max-width: 90vh;
    //height: 100vh;
    //background-size: cover;
    //background-position: center;
    //background-repeat: no-repeat;
    position: absolute;
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 80vh;
    border-radius: 20px;
    box-shadow: 0 18px 35px rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`;

export interface Person {
    name: string;
    url: string;
}

export type Swiper = {
    data: Person[];
    setData?: React.Dispatch<React.SetStateAction<Person[]>>;
} & Settings;

// eslint-disable-next-line react/display-name
const Swiper = (props: Swiper) => {
    // const settings: Settings = {
    //     speed: 500,
    //     infinite: true,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    //     arrows: false,
    //     afterChange: props.afterChange,
    //     beforeChange: props.beforeChange,
    // };
    //
    // return (
    //     <div className="swiper-container">
    //         <Slider {...settings}>
    //             {props.data.map((el, i) => (
    //                 <BackgroundDiv key={i} backgroundImage={el.url}>
    //                     <h3 style={{color: 'white'}}>{el.name}</h3>
    //                 </BackgroundDiv>
    //             ))}
    //         </Slider>
    //     </div>
    // );
    const swiped = (direction: string, nameToDelete: string) => {
        console.log('removing: ', nameToDelete);
        console.log('direction: ', direction);
    };

    const outOfFrame = (name: string) => {
        console.log('outOfFrame: ', name);
    };

    return (
        <div className="app">
            <div className="cardContainer">
                {props.data.map((person) => (
                    <TinderCard
                        className="swipe"
                        key={person.name}
                        onSwipe={(dir) => swiped(dir, person.name)}
                        onCardLeftScreen={() => outOfFrame(person.name)}
                    >
                        <BackgroundDiv
                            backgroundImage={person.url}
                            // className="card"
                        >
                            <h3>{person.name}</h3>
                        </BackgroundDiv>
                    </TinderCard>
                ))}
            </div>
        </div>
    );
}

export default Swiper;