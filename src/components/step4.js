import {Col, Descriptions, Row} from 'antd';
import {dishes} from "../common/data";

const styleDescriptionItem = {
    color: '#667085',
    fontSize: 15,
    width:'35%',
}
const Step4 = ({data}) => {

    const name = (value)=>{
        const found = dishes.find((item) => item.id === value);

        return found?.name
    }

    return (
        <div>
            <Row>
                <Col span={10}/>
                <Col span={10}>
                    <Descriptions column={1} >
                        <Descriptions.Item label="Meal"
                                           labelStyle={styleDescriptionItem}
                                           key={"Meal"}>
                            {data?.meal}
                        </Descriptions.Item>
                        <Descriptions.Item label="No of People"
                                           labelStyle={styleDescriptionItem}
                                           key={"people"}>
                            {data?.people}
                        </Descriptions.Item>
                        <Descriptions.Item label="Restaurant"
                                           labelStyle={styleDescriptionItem}
                                           key={"Restaurant"}>
                            {data?.restaurant}
                        </Descriptions.Item>
                        <Descriptions.Item label="Dishes"
                                           labelStyle={styleDescriptionItem}
                                           key={"Dishes"}>
                            <div style={{
                                border: "1px solid",
                                padding: 10
                            }}>
                                {
                                    data?.dishs?.map((item, index)=>{
                                        return(
                                            <div key={index} className={"flex"}>
                                                {name(item.dish)} - {item.serving}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </Descriptions.Item>
                    </Descriptions>
                </Col>
            </Row>
        </div>
    )
}

export default Step4
