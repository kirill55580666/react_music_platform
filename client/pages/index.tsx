import React from 'react';
import Navbar from '../components/Navbar';
import MainLayout from "../layouts/MainLayout";

const Index = () => {
    return (
        // @ts-ignore
        <MainLayout title={"Список треков - музыкальная площадка"}>
            <div className='center'>
                <h1>Добро пожаловать!</h1>
                <h3>Здесь собраны лучшие треки!</h3>
            </div>
            <style jsx>
                {`
                    .center {
                        margin-top: 150px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                    }
                `}
            </style>
        </MainLayout>


    );
};

export default Index;