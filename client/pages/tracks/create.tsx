// @ts-ignore
import React, {useState} from 'react';
import MainLayout from "../../layouts/MainLayout";
import StepWrapper from "../../components/StepWrapper";
import {Button, Grid, TextField} from '../../node_modules/@mui/material/index';
import FileUpload from '../../components/FileUpload';
import { useRouter } from '../../node_modules/next/router';
import {useInput} from "../../hooks/useInput";
import axios from 'axios'
import styles from '../../styles/TracksPage.module.scss'

const Create = () => {
    const [activeStep, setActiveStep] = useState(0)
    const [picture, setPicture] = useState(null)
    const [audio, setAudio] = useState(null)
    const name = useInput('')
    const artist = useInput('')
    const text = useInput('')

    const router = useRouter()

    const next = () => {
        if (activeStep !== 2) {
            setActiveStep(prevState => prevState + 1)
        } else {
            const formData = new FormData()
            formData.append('name', name.value)
            formData.append('text', text.value)
            formData.append('artist', artist.value)
            formData.append('picture', picture)
            formData.append('audio', audio)
            axios.post('http://localhost:5000/tracks', formData)
                .then(resp => router.push('/tracks'))
                .catch(e => console.log(e))
        }

    }
    return (
        // @ts-ignore
        <MainLayout>
            <StepWrapper activeStep={activeStep} className={styles.wrapper}>
                {activeStep === 0 &&
                <Grid container direction={"column"} style={{padding: 20}}>
                    <TextField
                        {...name}
                        style={{marginTop: 10}}
                        label={"Название трека"}
                    />
                    <TextField
                        {...artist}
                        style={{marginTop: 10}}
                        label={"Имя исполнителя"}
                    />
                    <TextField
                        {...text}
                        style={{marginTop: 10}}
                        label={"Слова к треку"}
                        multiline
                        rows={3}
                    />
                </Grid>
                }
                {activeStep === 1 &&
                // @ts-ignore
                <FileUpload setFile={setPicture} accept="image/*">
                    <Button>Загрузить изображение</Button>
                </FileUpload>
                }
                {activeStep === 2 &&
                // @ts-ignore
                <FileUpload setFile={setAudio} accept="audio/*">
                    <Button>Загрузить трек</Button>
                </FileUpload>
                }
            </StepWrapper>
            <Grid container justifyContent='space-between'>
                <Button disabled={activeStep === 0} onClick={() => setActiveStep(prev => prev - 1)}>Назад</Button>
                <Button onClick={next}>Далее</Button>
            </Grid>
        </MainLayout>
    );
};

export default Create;