import {Button, Col, Form, Input, Row, Select} from 'antd';
import {useEffect, useState} from "react";
import {dishes} from "../common/data";
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';

const Step3 = ({data, form}) => {

    const [dataDish, setDataDish] = useState()

    useEffect(() => {

        if (!data?.dishs?.length > 0){
            form.setFieldsValue({dishs: [{}]});
        }

        setDataDish(mapData(
            dishes.filter(item => item.restaurant === data?.restaurant
            )))
    }, [data?.restaurant, data?.dishs?.length, form])


    const mapData = (values) => {
        return values?.map(item => {
            return {
                label: item.name,
                value: item.id
            }
        })
    }

    return (
        <div>
            <Row>
                <Col span={7}/>
                <Col span={10}>
                    <Row gutter={12} className={"mb-2"}>
                        <Col span={11}>
                            <span style={{color: "red"}}>* </span>
                            <label>Please Select a Dish</label>
                        </Col>
                        <Col span={11}>
                            <span style={{color: "red"}}>* </span>
                            <label>Please Enter no of servings</label>
                        </Col>
                    </Row>
                    <Form.List name="dishs">
                        {(fields, {add, remove}) => (
                            <>
                                {fields.map(({key, name, ...restField}) => (
                                    <Row gutter={12} className={"mb-2"} key={key}>
                                        <Col span={11}>
                                            <Form.Item {...restField}
                                                       name={[name, 'dish']}
                                                       rules={[
                                                           {
                                                               required: true,
                                                               message: 'Please Select a Dish!',
                                                           },
                                                           {
                                                               validator: async (_, names) => {
                                                                   if (names) {
                                                                       const {dishs} = form.getFieldsValue("dishs")
                                                                       if (dishs.some((item, index)=>names === item.dish && index !== name))
                                                                       {
                                                                           return Promise.reject("dish has been used");
                                                                       }
                                                                   }
                                                               },
                                                           }
                                                       ]}>
                                                <Select
                                                    style={{width: 150}}
                                                    options={dataDish}
                                                    placeholder={"---"}
                                                />
                                            </Form.Item>
                                        </Col>

                                        <Col span={11}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'serving']}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: 'Please Enter no of servings',
                                                    },
                                                    {
                                                        pattern: /^(?:\d*)$/,
                                                        message: "Value should contain just number",
                                                    },
                                                ]}
                                            >
                                                <Input/>
                                            </Form.Item>
                                        </Col>

                                        <Col span={2}>
                                            {fields.length > 1 ? (
                                                <MinusCircleOutlined onClick={() => remove(name)}/>
                                            ) : null
                                            }
                                        </Col>
                                    </Row>
                                ))}

                                <div className={"flex pr-[17px]"}>
                                    <Form.Item>
                                        <Button shape="circle" onClick={() => add()} icon={<PlusOutlined/>}/>
                                    </Form.Item>
                                </div>
                            </>
                        )}
                    </Form.List>
                </Col>
                <Col span={7}/>
            </Row>

        </div>
    )
}

export default Step3
