import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Typography, Spin, Tooltip, Card, Row, Col } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import utils from '../utils';
import request from '../request';
import Txs from './txs';

const { Title, Paragraph } = Typography;

const Detail = () => {
  const {
    state = {
      blockHash: '00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa',
    },
  } = useLocation();
  const navigate = useNavigate();
  const [block, setBlock] = useState();
  const [tx, setTx] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (utils.isFalseWithoutZore(state.blockHash)) {
      navigate('/', { replace: true });
    } else {
      setLoading(true);
      request({
        url: `https://blockchain.info/rawblock/${state.blockHash}`,
      }).then((res) => {
        if (res) {
          const { tx, ...rest } = res;
          const calc = tx.reduce(
            (result, current) => {
              const amount = current.inputs?.reduce((result, current) => {
                return result + current.prev_out.value;
              }, 0);
              const out = current.out?.reduce((result, current) => {
                return result + current.value;
              }, 0);
              return {
                fee: result.fee + current.fee,
                transaction: result.transaction + amount,
                block: result.block + out,
              };
            },
            { fee: 0, transaction: 0, block: 0 }
          );
          setBlock({
            ...rest,
            formatTime: utils.dateFormat(rest.time),
            transactionVolume: calc.transaction,
            fee: calc.fee,
            blockReward: calc.block - calc.transaction,
          });
          setTx(tx);
        }
        setLoading(false);
      });
    }
  }, []);

  if (!block) {
    return (
      <Card bordered={false}>
        <Spin spinning={loading} />
      </Card>
    );
  }

  return (
    <Card bordered={false} style={{ textAlign: 'left' }}>
      <Spin spinning={loading}>
        <Typography>
          <Title level={3} className="title">
            block {block.height}
            <Tooltip title={`Block at height ${block.height} in the Bitcoin blockchain`} placement="right">
              <ExclamationCircleFilled className="title-icon" />
            </Tooltip>
          </Title>
          <Paragraph style={{ fontWeight: '500' }}>
            This block was mined on {new Date(Number(`${block.time}000`)).toString()} by -. It currently has -
            confirmations on the Bitcoin blockchain.
          </Paragraph>
          {/* <Paragraph>
            The miner(s) of this block earned a total reward of 6.25000000 BTC ($182,802.56). The reward consisted of a
            base reward of 6.25000000 BTC ($182,802.56) with an additional 0.16583560 BTC ($4,850.43) reward paid as
            fees of the 912 transactions which were included in the block. The Block rewards, also known as the Coinbase
            reward, were sent to this address.
          </Paragraph>
          <Paragraph>
            A total of 306.51676953 BTC ($8,965,128.15) were sent in the block with the average transaction being
            0.33609295 BTC ($9,830.18). Learn more about how blocks work.
          </Paragraph> */}
        </Typography>
        <Row className="row-text">
          <Col span={8}>
            <Tooltip title="Unique identifier used to identify a particular block" placement="top">
              <div>Hash</div>
            </Tooltip>
          </Col>
          <Col span={16}>
            <Paragraph copyable={{ text: block.hash }} style={{ margin: 0, color: 'rgb(103, 113, 133)' }}>
              <div className="text-overflow with-copy">{block.hash}</div>
            </Paragraph>
          </Col>
        </Row>
        <Row className="row-text">
          <Col span={8}>
            <div>Confirmations</div>
          </Col>
          <Col span={16}>
            <div className="text-overflow">-</div>
          </Col>
        </Row>

        <Row className="row-text">
          <Col span={8}>
            <div>Timestamp</div>
          </Col>
          <Col span={16}>
            <div className="text-overflow">{block.formatTime}</div>
          </Col>
        </Row>

        <Row className="row-text">
          <Col span={8}>
            <Tooltip title="Number of blocks connected on the blockchain" placement="top">
              <div>Height</div>
            </Tooltip>
          </Col>
          <Col span={16}>
            <div className="text-overflow">{block.height}</div>
          </Col>
        </Row>
        <Row className="row-text">
          <Col span={8}>
            <Tooltip title="Who confirmed the transactions in the block" placement="top">
              <div>Miner</div>
            </Tooltip>
          </Col>
          <Col span={16}>
            <div className="text-overflow">-</div>
          </Col>
        </Row>
        <Row className="row-text">
          <Col span={8}>
            <Tooltip title="Number of transactions included in this block" placement="top">
              <div>Number of Transactions</div>
            </Tooltip>
          </Col>
          <Col span={16}>
            <div className="text-overflow">{block.size}</div>
          </Col>
        </Row>
        <Row className="row-text">
          <Col span={8}>
            <Tooltip title="Mathematical value of how hard it is to find a valid hash for this block" placement="top">
              <div>Difficulty</div>
            </Tooltip>
          </Col>
          <Col span={16}>
            <div className="text-overflow">-</div>
          </Col>
        </Row>
        <Row className="row-text">
          <Col span={8}>
            <Tooltip
              title="The root node of a merkle tree, a descendant of all the hashed pairs in the tree"
              placement="top">
              <div>Merkle root</div>
            </Tooltip>
          </Col>
          <Col span={16}>
            <div className="text-overflow">{block.mrkl_root}</div>
          </Col>
        </Row>
        <Row className="row-text">
          <Col span={8}>
            <Tooltip title="Block version related to protocol proposals underway" placement="top">
              <div>Version</div>
            </Tooltip>
          </Col>
          <Col span={16}>
            <div className="text-overflow">0x{block.ver.toString(16)}</div>
          </Col>
        </Row>
        <Row className="row-text">
          <Col span={8}>
            <Tooltip title="A sub-unit of BTC, equal to 0.000001 BTC" placement="top">
              <div>Bits</div>
            </Tooltip>
          </Col>
          <Col span={16}>
            <div className="text-overflow">{utils.numberFormat(block.bits)}</div>
          </Col>
        </Row>
        <Row className="row-text">
          <Col span={8}>
            <Tooltip
              title="A measurement to compare the size of different transactions to each other in proportion to the block size limit"
              placement="top">
              <div>Weight</div>
            </Tooltip>
          </Col>
          <Col span={16}>
            <div className="text-overflow">{utils.numberFormat(block.weight)} WU</div>
          </Col>
        </Row>
        <Row className="row-text">
          <Col span={8}>
            <Tooltip title="Total size of the block" placement="top">
              <div>Size</div>
            </Tooltip>
          </Col>
          <Col span={16}>
            <div className="text-overflow">{utils.numberFormat(block.size)} bytes</div>
          </Col>
        </Row>
        <Row className="row-text">
          <Col span={8}>
            <Tooltip title="Random value that can be adjusted to satisfy the proof of work" placement="top">
              <div>Nonce</div>
            </Tooltip>
          </Col>
          <Col span={16}>
            <div className="text-overflow">{utils.numberFormat(block.nonce)}</div>
          </Col>
        </Row>
        <Row className="row-text">
          <Col span={8}>
            <Tooltip title="Estimated total amount transacted in this block" placement="top">
              <div>Transaction Volume</div>
            </Tooltip>
          </Col>
          <Col span={16}>
            <div className="text-overflow">{utils.feeFormat(block.transactionVolume)} BTC</div>
          </Col>
        </Row>
        <Row className="row-text">
          <Col span={8}>
            <Tooltip title="Static reward for the miner who calculated the hash for this block" placement="top">
              <div>Block Reward</div>
            </Tooltip>
          </Col>
          <Col span={16}>
            <div className="text-overflow">{utils.feeFormat(block.blockReward)} BTC</div>
          </Col>
        </Row>
        <Row className="row-text">
          <Col span={8}>
            <Tooltip
              title="Amount of transaction fees rewarded to the miner for calculating the hash for this block"
              placement="top">
              <div>Fee Reward</div>
            </Tooltip>
          </Col>
          <Col span={16}>
            <div className="text-overflow">{utils.feeFormat(block.fee)} BTC</div>
          </Col>
        </Row>

        <Typography style={{ marginTop: '24px' }}>
          <Title level={3} className="title">
            Block Transactions
            <Tooltip title={`All transactions recorded in Block at height ${block.height}`} placement="right">
              <ExclamationCircleFilled className="title-icon" />
            </Tooltip>
          </Title>
        </Typography>
        <Txs tx={tx} />
      </Spin>
    </Card>
  );
};

export default Detail;
