import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { config } from '../../Config';
import StateAndCountryDropDown from './StateAndCountryDropDown';
import SecondRowInfo from './SecondRowInfo';
import ThridRowInfo from './ThridRowInfo';
import dayjs from 'dayjs';

let radioButtonList = [{ id: '1', name: 'Customized Tours' }, { id: '2', name: 'Fixed Tours' }, { id: '3', name: 'Book Transport' }];
let Lead = ["B2B", "B2C"];
let Partner = ["Partner1", "Partner2", "Partner3"];
let roomsInitial = [{ "id": 1, "Adult": { "text": "(13y & above)", 'val': 1 }, "Kid": { "text": "(6y & 12y)", 'val': 0 }, "Infant": { "text": "(1y & 5y)", 'val': 0 } }];
const initialThridRowInfo = { 'guestName': '', 'guestNumber': '', 'guestEmail': '' };
const Package = () => {
    const [radioBtn, setRadioBtn] = useState('1');
    const [auth, setAuth] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [countryData, setCountryData] = useState([]);
    const [selectedState, setSelectedState] = useState([]);
    const [stateData, setStateData] = useState([]);
    const [leadState, setLeadState] = useState('');
    const [partnerState, setPartnerState] = useState('');
    const [nightsState, setNightsState] = useState('');
    const [value, setValue] = useState('');
    const [nightsData, setNightsData] = useState([]);
    const [travellerData, setTravellerData] = useState(roomsInitial);
    const [thridRowInfo, setThridRowInfo] = useState(initialThridRowInfo);

    useEffect(() => {
        getAuthToken();
        nightsDataLoop();
    }, [])

    const nightsDataLoop = () => {
        let pushedArr = [];
        for (let i = 1; i < 15; i++) {
            pushedArr.push(i + " Nights");
        };
        setNightsData(pushedArr);
    }

    const getAuthToken = () => {
        axios.get(`https://www.universal-tutorial.com/api/getaccesstoken`,
            {
                headers: {
                    "api-token": config.universalApiToken,
                    "user-email": config.mailId
                }
            })
            .then(res => {
                setAuth(res.data);
                if (res.status === 200) getCountryData(res.data)
            })
            .catch(err => console.log(err));
    }

    const getCountryData = (authToken) => {
        axios.get(`https://www.universal-tutorial.com/api/countries`, {
            headers: {
                "Authorization": `Bearer ${authToken?.auth_token}`,
            }
        })
            .then(res => {
                setCountryData(res.data);
            }).catch(err => console.log(err));
    }

    const getStateData = (name) => {
        axios.get(`https://www.universal-tutorial.com/api/states/${name}`, {
            headers: {
                "Authorization": `Bearer ${auth?.auth_token}`,
            }
        })
            .then(res => {
                setStateData(res.data);
            }).catch(err => console.log(err));
    }

    const handleChangeDatePicker = (val) => {
        setValue(val);
    }
    const handleIncOrDec = (travId, whichone, increOrdec) => {
        let copyTravellerData = [...travellerData];
        if (increOrdec === "increment") {
            for (let i = 0; i < copyTravellerData.length; i++) {
                if (copyTravellerData[i].id === travId) {
                    if (copyTravellerData[i][whichone].val < 10) {
                        copyTravellerData[i][whichone].val = copyTravellerData[i][whichone].val + 1;
                    } else alert('room limit reached');
                }
            }
            setTravellerData(copyTravellerData);
        } else {
            for (let i = 0; i < copyTravellerData.length; i++) {
                if (copyTravellerData[i].id === travId) {
                    if (copyTravellerData[i][whichone].val > 0) {
                        copyTravellerData[i][whichone].val = copyTravellerData[i][whichone].val - 1;
                    };
                }
            }
            setTravellerData(copyTravellerData);
        }
    }

    let adult = travellerData.reduce(function (cnt, o) { return cnt + o.Adult.val; }, 0)
    let kid = travellerData.reduce(function (cnt, o) { return cnt + o.Kid.val; }, 0)
    let infant = travellerData.reduce(function (cnt, o) { return cnt + o.Infant.val; }, 0)

    const addAnotherRoom = (passedid, removeOrAdd) => {
        if (removeOrAdd === 'remove') {
            setTravellerData(travellerData.slice(0, -1));
        } else {
            let lastId = travellerData.slice(-1)[0].id;
            let prevArr = [{ "id": (lastId + 1), "Adult": { "text": "(13y & above)", 'val': 1 }, "Kid": { "text": "(6y & 12y)", 'val': 0 }, "Infant": { "text": "(1y & 5y)", 'val': 0 } }];;
            setTravellerData([...travellerData, ...prevArr]);
        }
    }

    const handlechange = (e) => {
        let { name, value } = e.target;
        if (name === "selecToursRadioBtn") {
            if (value !== '1') alert('Coming Soon');
            setRadioBtn('1');
        } else if (name === "countryDroprDown") {
            setSelectedState([]);
            setSelectedCountry(value);
            getStateData(value?.country_name);
        } else if (name === "stateDroprDown") {
            setSelectedState(value);
        } else if (name === "leadDroprDown") {
            setLeadState(value);
        } else if (name === "partnerDroprDown") {
            setPartnerState(value);
        } else if (name === "nightsDroprDown") {
            setNightsState(value);
        } else {
            setThridRowInfo((prevData) => ({ ...prevData, [name]: value }));
        }
    };

    const finalResult = () => {
        let date = dayjs(value).format('MM/DD/YYYY')
        let finalData = {
            'contry': selectedCountry.country_name,
            'state': selectedState.state_name,
            'leadType': leadState,
            'partner': partnerState,
            'checkin': date,
            'NumberOfNights': nightsState,
            'rooms': {
                'totalRooms': travellerData.length,
                'adult': adult,
                'kid': kid,
                'infant': infant,
            },
            'guestname': thridRowInfo.guestName,
            'guestnumber': thridRowInfo.guestNumber,
            'guestemail': thridRowInfo.guestEmail,
        }
        console.log({ finalData });
    }

    return (
        <div>
            <Box sx={{ backgroundColor: 'rgba(0,0,0,.5)', margin: '2% 20%', padding: '10px 20px' }}>
                <h4 className='txt-color headline-txt'>Helping Travel Agents to sell holiday packages smarter, faster and effortless with Smart Itineraries &  Pricing Automation</h4>
                <FormControl sx={{ backgroundColor: "#00000038" }}>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue={radioBtn}
                        value={radioBtn}
                        name="radio-buttons-group"
                        sx={{ display: 'flex', flexDirection: 'row', padding: '0px 5px' }}
                    >
                        {radioButtonList.length > 0 && radioButtonList.map(ft => (
                            <FormControlLabel className='txt-color' key={ft?.id} value={ft?.id} control={<Radio sx={{
                                color: '#e95420',
                                '&.Mui-checked': {
                                    color: '#e95420',
                                },
                            }} checked={ft?.id !== '1' ? false : true} />} label={ft?.name} onChange={handlechange} name='selecToursRadioBtn' />
                        ))}
                    </RadioGroup>
                </FormControl>
                <StateAndCountryDropDown leadState={leadState} partnerState={partnerState} selectedCountry={selectedCountry} countryData={countryData} stateData={stateData} selectedState={selectedState} handlechange={handlechange} Partner={Partner} Lead={Lead} />
                <SecondRowInfo adult={adult} kid={kid} infant={infant} handleChangeDatePicker={handleChangeDatePicker} handleIncOrDec={handleIncOrDec} nightsState={nightsState} value={value} nightsData={nightsData} handlechange={handlechange} travellerData={travellerData} addAnotherRoom={addAnotherRoom} />
                <ThridRowInfo thridRowInfo={thridRowInfo} handlechange={handlechange} />
                <Button onClick={finalResult} sx={{ backgroundColor: 'yellow', color: 'white', padding: '10px', margin: '10px' }}>Serach Packages</Button>
            </Box>
        </div>
    )
}

export default Package