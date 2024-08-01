import {useEffect, useState} from "react";

import Swiper, { Person } from "@/components/Swiper/Swiper.tsx";

const mockData = [
    {
        name: 'name 1',
        url: 'https://wl-adme.cf.tsp.li/resize/728x/jpg/755/d6a/1f3eaf5ef4b1587743d63ce415.jpg'
    },
    {
        name: 'name 2',
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTca2pYGxx42SmA1k4y8rsFkAiMbnD2LdtqYg&s'
    },
    {
        name: 'name 3',
        url: 'https://cs14.pikabu.ru/post_img/big/2023/12/08/6/1702022743267177113.jpg'
    },
    {
        name: 'name 4',
        url: 'https://cs14.pikabu.ru/post_img/big/2023/12/08/6/1702022743267177113.jpg'
    },
    {
        name: 'name 5',
        url: 'https://cs14.pikabu.ru/post_img/big/2023/12/08/6/1702022743267177113.jpg'
    },
];

const Matches = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [data, setData] = useState<Person[]>([]);
    const [likes, setLikes] = useState<Person[]>([]);
    const [unlikes, setUnlikes] = useState<Person[]>([]);

    const handleBeforeChange = (oldIndex: number, newIndex: number) => {
        const direction = newIndex > oldIndex ? 'right' : 'left';

        if (direction === 'left') {
            setUnlikes((prev) => ([...prev, mockData[oldIndex]]))
        }

        if (direction === 'right') {
            setLikes((prev) => ([...prev, mockData[oldIndex]]))
        }

        // setData((prev) => prev.filter((_, i) => i !== oldIndex))
    };

    const handleAfterChange = (currentIndex: number) => {
        setCurrentSlide(currentIndex);
        if (data.length <= 2) {
            setData(prev => [...prev, ...mockData]);
        }
    };

    useEffect(() => {
        setData(mockData);
    }, []);

    return (
        <Swiper
            data={data}
            // setData={setData}
            // afterChange={handleAfterChange}
            // beforeChange={handleBeforeChange}
        />
    );
};

export default Matches;