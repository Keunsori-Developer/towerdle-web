import { CONFIG } from '../constant/config'
import apiClient, { getAccessToken, getNewToken } from './auth'
import { toCharArray } from './stringToCharArray'
import { WordFromWeb } from './wordFromWeb'
import axios from 'axios'

const val = await WordFromWeb()

const solveInfo = {
    wordId: val.id,
    attempts: 1,
    isSolved: true
}

export const isWinngWord = (word: string) => {
    const charVal = toCharArray(val.value)
    return word === charVal;
}

export const exportResult = async (tries: number, isSolved: boolean) => {
    console.log(`tries : ${tries}, isSolved: ${isSolved}`)
    try {
        const response = await apiClient.post<any>(
            `/word/solve`, { 
                wordId: val.id,
                attempts: tries,
                isSolved: isSolved
             },
        )
        console.log('send success')
    } catch (error) {
        throw error;
    }
}

export const getWordOfDay = () => {
    const epochMs = new Date(CONFIG.startDate).valueOf()
    const now = Date.now()
    const msInDay = 86400000
    const index = Math.floor((now - epochMs) / msInDay)
    const nextday = (index + 1) * msInDay + epochMs
    return {
        solution: val.value,
        tomorrow: nextday,
    }
  }
  

export const { solution, tomorrow } = getWordOfDay()