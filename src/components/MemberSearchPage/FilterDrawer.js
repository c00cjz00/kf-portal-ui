import React, { Component } from 'react';
import './MemberSearchPage.css';
import { Checkbox, Col, Collapse, Icon, Layout, List, Row, Tag, Typography } from 'antd';
import { withTheme } from 'emotion-theming';
import { ROLES } from 'common/constants';

const { Sider } = Layout;
const { Title } = Typography;
const { Panel } = Collapse;

class FilterDrawer extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  render() {
    return (
      <Sider
        trigger={null}
        width={300}
        collapsible
        collapsed={this.state.collapsed}
        style={{ boxShadow: '2px 2px 3px 1px #888888' }}
      >
        <div style={{ height: 50, display: 'flex', padding: '15px 7px 15px 12px' }}>
          <Title
            level={2}
            className={'h2-title'}
            style={{
              fontFamily: 'Montserrat,sans-serif',
              color: '#2b388f',
              fontWeight: 500,
              margin: 0,
              padding: 0,
              fontSize: 18,
              display: this.state.collapsed ? 'none' : 'block',
            }}
          >
            Filters
          </Title>
          <Icon
            style={{ width: '100%', textAlign: 'end', fontSize: 20, color: 'rgb(43, 56, 143)' }}
            type={this.state.collapsed ? 'double-right' : 'double-left'}
            onClick={this.onCollapse}
          />
        </div>
        <Collapse
          defaultActiveKey={['1']}
          style={{
            backgroundColor: 'white',
            display: this.state.collapsed ? 'none' : 'block',
            borderLeftWidth: 5,
            borderLeftColor: '#a42c90',
            borderRadius: 0,
          }}
        >
          <Panel
            key={1}
            header={
              <Title
                level={2}
                style={{
                  color: `${this.props.color ? this.props.color : this.props.theme.secondary}`,
                  margin: 0,
                  padding: 0,
                  fontFamily: `${this.props.theme.fonts.default}`,
                  textDecoration: 'none',
                  fontSize: 14,
                  fontWeight: 700,
                  textAlign: 'center',
                }}
              >
                Member Categories
              </Title>
            }
          >
            <List
              style={{ paddingLeft: 10 }}
              split={false}
              itemLayout="horizontal"
              dataSource={ROLES}
              renderItem={role => {
                return (
                  <List.Item key={role.type} style={{ paddingTop: 0, paddingBottom: 5 }}>
                    <Row
                      type="flex"
                      justify="space-around"
                      align="middle"
                      gutter={10}
                      style={{ width: '100%' }}
                    >
                      <Col span={20}>
                        <Checkbox
                          checked={this.props.checkboxes[role.type]}
                          onChange={this.props.onChange(role.type)}
                        >
                          {role.displayName}
                        </Checkbox>
                      </Col>
                      <Col span={4}>
                        <Tag
                          style={{
                            backgroundColor: 'rgba(169, 173, 192, 0.3)',
                            color: '#343434',
                            boxShadow: '0 0 0 1px #d9d9d9 inset',
                          }}
                        >
                          {this.props.count[role.type]}
                        </Tag>
                      </Col>
                    </Row>
                  </List.Item>
                );
              }}
            />
          </Panel>
        </Collapse>
      </Sider>
    );
  }
}
const FilterDrawerWithTheme = withTheme(FilterDrawer);

export default FilterDrawerWithTheme;
