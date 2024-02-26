import './App.css';
import {Button, Form, Radio} from 'antd';
import {useState} from "react";
import Step1 from "./components/step1";
import Step2 from "./components/step2";
import Step3 from "./components/step3";
import Step4 from "./components/step4";

const App = () => {

    const [form] = Form.useForm();
    const [step, setStep] = useState(1)
    const [data, setData] = useState()
    const [completeStep, setCompleteStep] = useState([])

    const handlePositionChange = ({target: {value}}) => {
        if (completeStep.includes(value)){
            setStep(value);
        }
    };

    const onFinish = (value) => {
        let dataTemp = mapData(value)
        if (dataTemp){
            setData(mapData(value))
            setStep(step + 1 > 4 ? 4 : step + 1)
            setCompleteStep([...new Set(completeStep.concat([step, step + 1]))])
        }
    }

    const mapData = (value)=>{
        switch (step) {
            case 1:
                return value
            case 2:
                return { ...data, ...value }
            case 3:
                let sum = 0 ;
                value.dishs?.map(item=>sum += Number(item.serving))
                if (sum >= data.people){
                    return {...data, ...value}
                }else {
                    alert("The total number of dishes should be greater or equal to the number of people");
                    return null
                }
            default:
                console.log("data submit :: ", data)
                return data
        }
    }

    const RenderStep = () => {
        switch (step) {
            case 1:
                return <Step1/>
            case 2:
                return <Step2 data={data}/>
            case 3:
                return <Step3 data={data} form={form}/>
            default:
                return <Step4 data={data}/>
        }
    }

    const RenderPrevious = () => {
        if (step > 1) {
            return (
                <Form.Item>
                    <Button
                        onClick={() => {
                            setStep(step - 1)
                        }}
                    >
                        Previous
                    </Button>
                </Form.Item>
            )
        }

        return (
            <Form.Item>
                <Button
                    className={"invisible"}
                >
                </Button>
            </Form.Item>
        )
    }

    return (
        <div className="App pt-12">
            <Radio.Group onChange={handlePositionChange}
                         value={step}
                         style={{marginBottom: 8}}>
                <Radio.Button value={1}>Step 1</Radio.Button>
                <Radio.Button value={2}>Step 2</Radio.Button>
                <Radio.Button value={3}>Step 3</Radio.Button>
                <Radio.Button value={4}>Review</Radio.Button>
            </Radio.Group>

            <div className={"pt-12 flex justify-center"}>
                <Form
                    name="basic"
                    style={{
                        maxWidth: 1000,
                    }}
                    layout={"vertical"}
                    onFinish={onFinish}
                    autoComplete="off"
                    form={form}
                >
                    <RenderStep/>

                    <div className={"pt-12 flex justify-around"} style={{width: 1000}}>

                        <RenderPrevious/>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                            >
                                { step === 4 ? "Submit" : "Next" }
                            </Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default App;
