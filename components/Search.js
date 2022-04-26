import SearchIcon from '@mui/icons-material/Search';
import styled from "styled-components"
import { db } from '../firebase';
import AsyncSelect from 'react-select/async';

export default function SearchContainer() {

    const selectedTag = []

    const customStyles = {
        container: provided => ({
            ...provided,
            width: "250px",

        }),
        
    };


    const loadOptions = async (inputValue) => {
        inputValue = inputValue.toLowerCase().replace(/\W/g, "");
        return new Promise((resolve => {
            db.collection('users')
                .orderBy('email')
                .startAt(inputValue)
                .endAt(inputValue + "\uf8ff")
                .get()
                .then(docs => {
                    if (!docs.empty) {
                        let data = []
                        docs.forEach(function (doc) {
                            const userEmail = {
                                value: doc.id,
                                label: doc.data().email
                            }
                            data.push(userEmail)
                        });
                        return resolve(data)
                    } else {
                        return resolve([])
                    }
                })
        })
        )
    }

    const handleOnChange = (usersEmail) => {
        this.setState({
            selectedTag: [usersEmail]
        })
    }

    return (
        <Search>
            <SearchIcon style={{ marginRight: "20px" }} />
            <AsyncSelect
                loadOptions={loadOptions}
                onChange={handleOnChange}
                styles={customStyles}
                placeholder={<div>Type email to search</div>}
            />

            {
                selectedTag.map(e => {
                    return (
                        <li key={e.value}>
                            {e.label}
                        </li>
                    )
                })
            }

        </Search>
    )
}

const Search = styled.div`
display: flex;
align-items: center;
padding: 20px;
`;


