import {Col, Form, Row, Select} from 'antd';
import {useEffect, useState} from "react";
import {dishes} from "../common/data";

const Step2 = ({data}) => {

    const [dataRestaurant, setDataRestaurant] = useState()

    useEffect(()=>{
        setDataRestaurant(mapData(
            filterAndRemoveDuplicates(dishes.filter(item => item.availableMeals.includes(data?.meal))
        )))
    },[data?.meal])

    const filterAndRemoveDuplicates = (array) => {
        const uniqueMap = new Map();

        return array.filter(item => {
            const key = item["restaurant"];

            if (!uniqueMap.has(key)) {
                uniqueMap.set(key, true);
                return true;
            }

            return false;
        });
    };

    const mapData = (values)=>{
        return values?.map(item=>{
            return {
                label: item.restaurant,
                value: item.restaurant
            }
        })
    }

    return (
        <div>
            <Row>
                <Col span={9}/>
                <Col span={6}>
                    <Form.Item label="Please Select a Restaurant"
                               name={"restaurant"}
                               rules={[
                                   {
                                       required: true,
                                       message: 'Please Select a Restaurant!',
                                   },
                               ]}>
                        <Select
                            options={dataRestaurant}
                            placeholder={"---"}
                        />
                    </Form.Item>
                </Col>
                <Col span={9}/>
            </Row>

        </div>
    )
}

export default Step2
