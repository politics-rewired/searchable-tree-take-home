import React, {useState} from "react";
import "./App.css";
import {Layout, Input, Card, Collapse, Checkbox} from "antd";
import {MyTree} from "./MyTree";
import {testData} from "./data";

const {Header, Content} = Layout;
const {Panel} = Collapse;

function App() {
    const [firstSearch, setFirstSearch] = useState("");
    const [secondSearch, setSecondSearch] = useState("");
    const [thirdSearch, setThirdSearch] = useState("");
    const [fourthSearch, setFourthSearch] = useState("");
    const [publicResultsOnly, setPublicResultsOnly] = useState(false);

    const onFirstInputChange = (ev) => {
        setFirstSearch(ev.target.value);
    };

    const onSecondInputChange = (ev) => {
        setSecondSearch(ev.target.value);
    };

    const onThirdInputChange = (ev) => {
        setThirdSearch(ev.target.value);
    };

    const onFourthInputChange = (ev) => {
        setFourthSearch(ev.target.value);
    };

    const onPublicCheckboxChange = (ev) => {
        setPublicResultsOnly(ev.target.checked);
    };

    return (
        <Layout>
            <Header>
                <h1 style={{color: "white"}}>Searchable Tree Take Home </h1>
            </Header>
            <Content>
                <Card>
                    <Collapse>
                        <Panel header="1. Basic" key="basic">
                            <Input onChange={onFirstInputChange} value={firstSearch}/>
                            <br/>
                            <MyTree data={testData} search={firstSearch} useIcons={false}/>
                        </Panel>
                        <Panel header="2. With Public Filter" key="with-public">
                            <Checkbox
                                onChange={onPublicCheckboxChange}
                                value={publicResultsOnly}
                            >
                                Only Include Public Objects?
                            </Checkbox>
                            <Input onChange={onSecondInputChange} value={secondSearch}/>
                            <br/>
                            <MyTree data={testData} search={secondSearch} publicOnly={publicResultsOnly}
                                    useIcons={false}/>
                        </Panel>
                        <Panel header="3. With Type Icons" key="with-icons-2">
                            <Input onChange={onThirdInputChange} value={thirdSearch}/>
                            <br/>
                            <MyTree data={testData} search={thirdSearch} useIcons={true}/>
                        </Panel>
                        <Panel header="4. With System Name in Parenthesis" key="with-icons">
                            <Input onChange={onFourthInputChange} value={fourthSearch}/>
                            <br/>
                            <MyTree data={testData} useIcons={false} search={fourthSearch}
                                    formatDisplayName={item => `${item.displayName} (${item.systemName})`}/>
                        </Panel>
                    </Collapse>
                </Card>
            </Content>
        </Layout>
    );
}

export default App;
