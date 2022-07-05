import React from 'react';
import Navbar from '../components/Navbar';
// @ts-ignore
import {Container} from "@mui/material";
import Player from '../components/Player';
import Head from '../node_modules/next/head';
import styles from '../styles/MainLayout.module.scss'

interface MainLayoutProps {
    title?: string;
    description?: string;
    keywords?: string;
}

// @ts-ignore
const MainLayout: React.FC<MainLayoutProps> = ({
                                                   children,
                                                   title,
    description,
    keywords
    }) => {
    return (
        <>
            <Head>
                <title>{title || 'Музыкальная платформа'}</title>
                <meta name="description" content={`Музыкальная площадка. Здесь каждый может оставить свой трек и стать знаменитым.` + description}/>
                <meta name="robots" content="index, follow"/>
                <meta name="keywords" content={keywords || "Музыка, треки, артисты"}/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <Navbar/>
            <div className={styles.wrapper}>
                <Container style={{margin: '90px 0', padding: 0}}>
                    {children}
                </Container>
            </div>

            <Player/>
        </>
    );
};

export default MainLayout;