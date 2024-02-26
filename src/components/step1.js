import {Col, Form, Input, Row, Select} from 'antd';
import {DataMeal} from "../common/dataMeal";

const Step1 = () => {

    return (
        <div>
            <Row>
                <Col span={9}/>
                <Col span={6}>
                    <Form.Item label="Please Select a meal"
                               name={"meal"}
                               rules={[
                                   {
                                       required: true,
                                       message: 'Please Select a meal!',
                                   },
                               ]}>
                        <Select
                            options={DataMeal}
                            placeholder={"---"}
                        />
                    </Form.Item>
                </Col>
                <Col span={9}/>
            </Row>

            <Row>
                <Col span={9}/>
                <Col span={6}>
                    <Form.Item label="Please Enter Number of people"
                               name={"people"}
                               rules={[
                                   {
                                       required: true,
                                       message: 'Please Enter Number of people!',
                                   },
                                   {
                                       pattern: /^(?:\d*)$/,
                                       message: "Value should contain just number",
                                   },
                                   {
                                       validator: async (_, names) => {
                                           if (names && !isNaN(names)) {
                                               if (names >= 11)
                                                   return Promise.reject(new Error("Exceeded maximum rubric field. (Max is 10)"));
                                           }
                                       },
                                   }
                               ]}
                               className={"pt-6"}>
                        <Input min={1} max={10} style={{width: "100%"}}/>
                    </Form.Item>
                </Col>
                <Col span={9}/>
            </Row>
        </div>
    )
}

export default Step1
