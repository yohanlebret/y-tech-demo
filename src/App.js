import React from 'react';

import { Layout } from 'antd';
import { Tabs, Icon } from 'antd-mobile';
import { CoffeeOutlined } from '@ant-design/icons';

import { GridItems, ShoppingCart } from './Components';

import './App.less';


const { Header, Content } = Layout;

const mainTabs = [
  { title: <CoffeeOutlined /> },
  { title: <Icon type="search" /> },
];

const beersTabs = [
  { title: 'All', sub: '1' },
  { title: 'Pizza', sub: '2' },
  { title: 'Steak', sub: '3' },
];

// main app with tabs and ShoppingCart
function App() {
  return (
    <Layout>
      <Header>Demo App</Header>
      <Content>
        <Tabs
          tabs={mainTabs}
          initialPage={0}
          swipeable={false}
        >
          <div className="content-beer">
            <Tabs
              tabs={beersTabs}
              initialPage={0}
            >
              <GridItems />
              <GridItems foodType="pizza" />
              <GridItems foodType="steak" />
            </Tabs>
          </div>
          <div>
            Work In Progress
          </div>
        </Tabs>
      </Content>
      <ShoppingCart />
    </Layout>
  );
}

export default App;
