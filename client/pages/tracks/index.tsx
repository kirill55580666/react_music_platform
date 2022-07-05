// @ts-ignore
import React, {useState} from 'react';
import MainLayout from "../../layouts/MainLayout";
// @ts-ignore
import {Grid} from "@mui/material";
import {Box, Button, Card, TextField } from '../../node_modules/@mui/material/index';
import { useRouter } from '../../node_modules/next/router';
import { ITrack } from '../../types/tracks';
import TrackList from "../../components/TrackList";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";
import {NextThunkDispatch, wrapper} from '../../store/index';
import {fetchTracks, searchTracks} from "../../store/action-creators/track";
import {useDispatch} from "react-redux";
import useDebounce from "../../hooks/useDebounce";
import styles from '../../styles/TracksPage.module.scss'

const Index = () => {
    const router = useRouter()
    const {tracks, error} = useTypedSelector(state => state.track)
    const [query, setQuery] = useState<string>('')
    const dispatch = useDispatch() as NextThunkDispatch
    const [timer, setTimer] = useState(null)

    const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        if(timer) {
            clearTimeout(timer)
        }
        setTimer(
            setTimeout(async () => {
                await dispatch(await searchTracks(e.target.value))
            }, 500)
        )
    }

    // const debounceSearch = useDebounce(async (e) => {
    //     setQuery(e.target.value)
    //     await dispatch(await searchTracks(e.target.value))
    // }, 500)

    if (error) {
        return <MainLayout>
            <h1>{error}</h1>
        </MainLayout>
    }

    return (
        // @ts-ignore
        <MainLayout>
            <Grid container justifyContent='center'>
                <Card style={{width: 700}}>
                    <Box
                        p={3}
                    >
                        <Grid container justifyContent='space-between'>
                            <h1>Список треков</h1>
                            <Button onClick={() => router.push('/tracks/create')}>Загрузить</Button>
                        </Grid>
                    </Box>
                    <TextField
                        fullWidth
                        value={query}
                        onChange={search}
                    />

                    <TrackList tracks={tracks}/>
                </Card>
            </Grid>
        </MainLayout>
    );
};

export default Index;

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
    const dispatch = store.dispatch as NextThunkDispatch;
    await dispatch(await fetchTracks());
});