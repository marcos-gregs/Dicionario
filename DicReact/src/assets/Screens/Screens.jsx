import { useEffect, useState } from "react"

import './ScreensStyle.css'

const RequestLetter = async (letter)=>{
    const GetValue = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${letter}`)
    const Data = await GetValue.json()
    
    return Data
}
export const Screens = ()=>{
   
    const [ InitDic ,stInitDic ] =useState( {} )
    const [ letter ,setLetter ] = useState( )
    const [ Meaning, setMeaning] = useState([])
    const [ TextValue,setTextValue ] = useState('')
    const [ AudioValue,setAudioValue] = useState('')
    const [ClassIcon,setClassIcon] = useState('Sun')

    const DarkMode = ()=>{
        if(ClassIcon ==='Moon'){
            setClassIcon('Sun')
       }
       if(ClassIcon ==='Sun'){
        setClassIcon('Moon')
       }
       const body = document.querySelector('body')
       body.classList.toggle('light-theme')
    }
    
    const OnChanceInput = (eve) => {
    setLetter(eve.target.value)
    }
    
    const ActionBtn = (value) => {
        RequestLetter(value).then(res => {
            stInitDic(res[0])
            FilterSong(res[0].phonetics)
            FilterText(res[0])
            setMeaning(res[0].meanings)
        })
    }

    const FilterSong = (element) =>{
        element.map(element => {
            if(element.audio !== ''){
                setAudioValue(`${element.audio}`)
            }
        });
       
    }

    const FilterText = (element)=>{
        if(element.phonetic){
            setTextValue(element.phonetic)
        }else {
             element.phonetics.map(phonetics =>{
                if(phonetics.text !== ' '){ setTextValue(phonetics.text)}
             }
                 )}
           
        
    } 

    const TextVerif = (NameElement,elementValue)=>{
        if(elementValue.length > 0){
         
            let tagClass = `Section-${NameElement}`
            return(<>
            <div className={tagClass}>
                  <h3>{NameElement} :</h3>
                  <ul>
                         {elementValue.map(element =>{
                    return(<>
                     <li>{element}</li></>)})} 
                  </ul>
          
            </div>
             
            </>)
        }else{
            return(<></>)
        }
    }

    const FilterExample = (FilterContent) =>{
        if(FilterContent.example){
            return(<>
            <li>''{FilterContent.example}''</li>
            </>)
         
        }else{
            console.log('Teste else')
            console.log(FilterContent)
        }

    }


    useEffect( () => {
        RequestLetter('hello').then(res => {
            stInitDic(res[0]) 
            FilterSong(res[0].phonetics)
            FilterText(res[0])
            setMeaning(res[0].meanings)
        })
       
    },[])

    return(<>
   <section className="ContentInput">
        
        <i className="fa-solid fa-book"></i>
        <input type="text" onChange={OnChanceInput} placeholder="Letter Here" className="InputLetter" value={letter}/>
        
        <button className='BtnClick' onClick={()=>{ActionBtn(letter)}}><i className="fa-solid fa-magnifying-glass"></i></button>

        <div className={ClassIcon} onClick={DarkMode}></div>
   </section>

    <section className="DashboardDic">
        <div className="ContentMain">
            
            <div>
                 <h1>{InitDic.word}</h1>
                 <span>{TextValue}</span>
            </div>

            <div className="SongDisplay">
                <audio controls='controls' src={AudioValue}/>        
            </div>
        </div>
        { Meaning.map(element=>{
            return(
                <>
                <div className="MainStructur">
                    
                    <div className="partOfSpeech">
                         <h1>{element.partOfSpeech}</h1><div className="LineContet">.</div>
                    </div>
 
                        
                    <div className="DivDefinition">
                             <h3>Definition:</h3>
                             
                             <ul>
                                {element.definitions.map(element =>{
                                    return(<>
                                        <li>{element.definition}
                                        {FilterExample(element)}
                                        </li>
                                    </>)
                                })}
                             </ul>                                
                    </div>
                    <div className="DivSyAny">  

                                { TextVerif('Synonyms',element.synonyms) }
                                                                     
                                { TextVerif('Antonyms',element.antonyms) }
                       
                    </div>           
                
                </div>
         
                </>
            )
        })}
    </section>
    
    </>
    )
}