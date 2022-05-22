import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input, Row, Col } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import utils from '../utils';

import logo from '../logo.svg';

const Home = () => {
  const [text, setText] = useState();

  const navigate = useNavigate();

  return (
    <header className="app-header">
      <img src={logo} className="app-logo" alt="logo" />
      <Row justify="center" gutter={24} style={{ width: '100%' }}>
        <Col md={12} xs={24}>
          <Input
            size="large"
            value={text}
            onChange={(e) => setText(e.target.value?.trim())}
            onPressEnter={() => {
              navigate('/detail', { state: { blockHash: text } });
            }}
            suffix={
              <>
                {!utils.isFalseWithoutZore(text) && (
                  <Link className="app-link" state={{ blockHash: text }} to="/detail">
                    <SearchOutlined />
                  </Link>
                )}
              </>
            }
          />
        </Col>
      </Row>
    </header>
  );
};

export default Home;
