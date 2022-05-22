import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Pagination, Grid, Tooltip } from 'antd';
import { ArrowRightOutlined, GlobalOutlined } from '@ant-design/icons';
import utils from '../utils';

const { useBreakpoint } = Grid;

const pageSize = 5;

const Txs = (props) => {
  const { tx } = props;
  const [pageNo, setPageNo] = useState(1);
  const screens = useBreakpoint();
  const subTx = useMemo(() => {
    const sub = tx.slice(pageSize * (pageNo - 1), pageNo * pageSize);
    return sub.map((item) => {
      const amount = item.out?.reduce((result, current) => {
        return result + current.value;
      }, 0);
      const inputs = item.inputs?.map((input, inputInd) => {
        let { addr } = input.prev_out;
        if (utils.isFalseWithoutZore(addr)) {
          addr = <span style={{ color: 'rgb(0, 135, 90)' }}>COINBASE (Newly Generated Coins)</span>;
        }
        return (
          <Row
            align="middle"
            key={`${item.hash}-input-${
              utils.isFalseWithoutZore(input.prev_out.addr) ? inputInd : input.prev_out.addr
            }`}>
            <Col sm={16} xs={24}>
              <span className="text-overflow" style={{ width: '100%', maxWidth: '350px', color: 'rgb(12, 108, 242)' }}>
                {addr}
              </span>
            </Col>
            {!utils.isFalseWithoutZore(input.prev_out.addr) && (
              <Col sm={8} xs={24} className={`${screens.sm ? 'col-right' : ''}`}>
                <span className="text-overflow">
                  {utils.feeFormat(input.prev_out.value)} BTC{' '}
                  {input.prev_out.spent && (
                    <Tooltip title="Output">
                      <GlobalOutlined style={{ color: 'rgb(61, 137, 245)' }} />
                    </Tooltip>
                  )}
                </span>
              </Col>
            )}
          </Row>
        );
      });
      const outs = item.out?.map((out, outInd) => {
        const { addr } = out;

        return (
          <Row align="middle" key={`${item.hash}-out-${addr || outInd}`}>
            <Col sm={16} xs={24}>
              <span
                className="text-overflow"
                style={{ width: '100%', maxWidth: '350px', textAlign: 'left', color: 'rgb(12, 108, 242)' }}>
                {addr || 'OP_RETURN'}
              </span>
            </Col>
            <Col sm={8} xs={24} className={`${screens.sm ? 'col-right' : ''}`}>
              <span className="text-overflow">
                {utils.feeFormat(out.value)} BTC{' '}
                {out.spent && (
                  <Tooltip title="Spent">
                    <GlobalOutlined style={{ color: 'rgb(234, 91, 80)' }} />
                  </Tooltip>
                )}
              </span>
            </Col>
          </Row>
        );
      });
      return (
        <div key={item.hash}>
          <Row className="tx-row" gutter={12}>
            <Col className="tx-col-text" xs={6} sm={3}>
              Fee
            </Col>
            <Col className="tx-col-text text-overflow" xs={18} sm={9}>
              <div>{utils.feeFormat(item.fee)} BTC</div>
            </Col>
            <Col className="tx-col-text" xs={6} sm={3}>
              {screens.sm ? null : 'Amount'}
            </Col>
            <Col className={`tx-col-text text-overflow ${screens.sm ? 'col-right' : ''}`} xs={18} sm={9}>
              <span className="amount-label">{utils.feeFormat(amount)} BTC</span>
            </Col>
            <Col className="tx-col-text" xs={6} sm={3}>
              Hash
            </Col>
            <Col className="tx-col-text text-overflow" xs={18} sm={9}>
              <span className="app-link">{item.hash}</span>
            </Col>
            <Col className="tx-col-text" xs={6} sm={3}>
              {screens.sm ? null : 'Date'}
            </Col>
            <Col className={`tx-col-text text-overflow ${screens.sm ? 'col-right' : ''}`} xs={18} sm={9}>
              <span>{utils.dateFormat(item.time)}</span>
            </Col>
            <Col className="tx-col-text" xs={6} sm={3}>
              {screens.sm ? null : 'From'}
            </Col>
            <Col className="tx-col-text text-overflow" xs={18} sm={9}>
              {inputs}
            </Col>
            <Col className="tx-col-text" xs={6} sm={2}>
              {screens.sm ? <ArrowRightOutlined style={{ color: 'green' }} /> : 'To'}
            </Col>
            <Col className={`tx-col-text text-overflow ${screens.sm ? 'col-right' : ''}`} xs={18} sm={10}>
              {outs}
            </Col>
          </Row>
        </div>
      );
    });
  }, [tx, pageNo, screens]);

  return (
    <>
      {subTx}
      <Pagination
        size="small"
        current={pageNo}
        pageSize={pageSize}
        onChange={(current) => setPageNo(current)}
        total={tx.length}
        showSizeChanger={false}
      />
    </>
  );
};
Txs.propTypes = {
  tx: PropTypes.array.isRequired,
};
export default Txs;
