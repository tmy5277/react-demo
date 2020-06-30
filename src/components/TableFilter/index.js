import React from 'react';
import ReactDOM from 'react-dom';
import {
  Form, Select, Radio, Cascader, Input,
  Row, Col, Slider, Divider, DatePicker,
  Icon, Button, Modal, Tag
} from 'antd'
// DatePicker i18n
import moment from 'moment';
import 'moment/locale/zh-cn';
// import locale from 'antd/es/date-picker/locale/zh_CN' // DatePicker input

import style from './index.module.scss'

moment.locale('zh-cn'); // DatePicker picker

const { RangePicker } = DatePicker
const InputGroup = Input.Group
const { Option } = Select
const { Search } = Input
const { CheckableTag } = Tag;

class TableFilter extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      searchVal: '',
      searchType: 0,
      searchLock: false,
      sliderModalVisible: false,
      sliderVal: [0, 0],
      sliderType: 'cash',
      sliderInputText: "",
      expandButtonStatus: {},
      expandButtonShow: {},
      filterExpand: false
    }
    this.selectRefs = {}
  }
  componentDidMount() {
    this.handleShowExpand()
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    let newState = {}
    if (nextProps.options.some(item => item.initialize)) {
      nextProps.options.map(item => {
        // console.log('debug item.initialize', item.initialize)
        if (item.initialize) {
          switch (item.type) {
            case 'slider-range':
              newState.sliderVal = item.value
              newState.sliderType = item.selectValue
              let text = "全部"
              let currectSelectItem = item.options.find(opt => opt.key === item.selectValue)
              if (currectSelectItem) {
                let currectOptions = currectSelectItem.options || []
                let startVal = currectOptions[item.value[0]].label
                let endVal = currectOptions[item.value[1]].label
                text = (startVal === endVal) ? startVal : `${startVal} ~ ${endVal}`
              }
              newState.sliderInputText = text
              break
            case 'search':
              newState.searchVal = item.value
              newState.searchType = item.selectValue
              break
            default:
              break
          }
        }
        return item
      })
    }
    return {
      ...newState
    }
  }
  handleSearchSelectChange = (e, item) => {
    // warning
    item.initialize = false
    this.setState({
      searchType: e,
    })
  }
  handleSearchInputChange = (e, item) => {
    // warning
    let val = e.target.value
    item.initialize = false
    this.setState({
      searchVal: val
    })
  }
  handleSliderInputClick = e => {
    this.setState({
      sliderModalVisible: true
    })
  }
  handleSliderSelectChange = (e, item) => {
    item.initialize = false
    this.setState({
      sliderType: e,
      sliderVal: [0, 0]
    })
  }
  handleSliderChange = (vals, item) => {
    item.initialize = false
    this.setState({
      sliderVal: vals
    })
  }
  handleModalCancel = () => {
    this.setState({
      sliderModalVisible: false
    })
  }
  handleModalReset = item => {
    item.initialize = false
    this.setState({
      sliderVal: [0, 0]
    })
  }

  handleChangeTag = (valArr, val, key) => {
    let index = valArr.indexOf(val)
    let arr = [].concat(valArr)
    if (index === -1) {
      arr.push(val)
    } else {
      arr.splice(index, 1)
    }
    this.props.filterValueChange(key, arr)
  }

  handleChangeAll = (item, val) => {
    let list = val ? item.options.map(child => child.value[item.key]) : []
    this.props.filterValueChange(item.key, list)
  }

  handleTableHeightChange = () => {
    this.props.getTableHeight && typeof (this.props.getTableHeight) === 'function' && this.props.getTableHeight()
  }

  handleExpand = (item) => {
    this.setState({
      expandButtonStatus: {
        ...this.state.expandButtonStatus,
        [item.key]: !this.state.expandButtonStatus[item.key]
      }
    }, () => {
      // wait for parent component already render
      // setTimeout(() => {
        this.handleTableHeightChange()
      // }, 0)
    })
  }

  handleShowExpand = () => {
    let showObj = {}
    for (let item in this.selectRefs) {
      let isShow = false
      let dom = ReactDOM.findDOMNode(this.selectRefs[item])
      let style = window.getComputedStyle(dom)
      if (style.lineHeight === style.height) {
        isShow = false
      } else {
        isShow = true
      }
      showObj[item] = isShow
    }
    this.setState({
      expandButtonShow: showObj
    })
  }

  handleExpandFilter = () => {
    let children = this.filterFormDom.props.children || []
    if (children.length && children[0].length) {
      this.setState({
        filterExpand: !this.state.filterExpand
      }, () => {
        this.handleTableHeightChange()
      })
    }
  }

  // handleCheckAllChange = (e, item, index) => {
  //   let checkall = e.target.checked
  //   let checkedList = checkall ? item.options.map(child => child.value[item.key]) : []
  //   this['indeterminate' + index] = false
  //   this['checkall' + index] = checkall
  //   this.props.filterValueChange(item.key, checkedList)
  // }
  // handleCheckBoxChange = (checkedList, item, index) => {
  //   this['indeterminate' + index] = checkedList.length && checkedList.length < item.options.length
  //   this['checkall' + index] = checkedList.length === item.options.length
  //   this.props.filterValueChange(item.key, checkedList)
  // }
  render() {
    // form
    let { options, filterValueChange, formProps } = this.props
    let { searchVal, searchType, searchLock, sliderModalVisible, sliderVal, sliderType,
      sliderInputText, expandButtonStatus, filterExpand, expandButtonShow } = this.state
    const searchOptions = ['search', 'time-range', 'slider-range'];
    const filterOpts = options.filter(item => !(searchOptions.includes(item.type)));
    const searchOpts = options.filter(item => searchOptions.includes(item.type))
    // const { getFieldDecorator } = form
    // console.log('debug filterOpts', filterOpts)
    // console.log('debug searchOpts', searchOpts)
    // console.log(expandButtonShow)
    return (
      <section className={style['filter-main']}>
        <Form labelAlign="left" labelCol={{ xl: 2, lg: 3 }} wrapperCol={{ xl: 22, lg: 21 }} {...formProps} ref={(filterFormDom) => this.filterFormDom = filterFormDom} className={`${style['filter-form']} ${filterExpand ? style['form-expand'] : ''}`}>
          {
            filterOpts.map((item, index) => {
              switch (item.type) {
                case 'select':
                  return (
                    <Form.Item className={style["filter-form__item"]} key={item.key} label={item.label}>
                      <Select style={{ width: '200px' }} {...item.props} onChange={e => {
                        let result = null
                        if (e instanceof Array) {
                          result = e.map(val => {
                            return item.options[val].value
                          })
                        } else {
                          result = item.options[e].value
                        }
                        filterValueChange(item.key, result)
                      }}>
                        {
                          item.options.map((opt, index) => (<Option key={index} value={index}>{opt.label}</Option>))
                        }
                      </Select>
                    </Form.Item>
                  )
                case 'radio':
                  return (
                    <Form.Item className={style["filter-form__item"]} key={item.key} label={item.label}>
                      <Radio.Group className={style["radio-group__wrap"]} buttonStyle="solid" {...item.props} onChange={e => { filterValueChange(item.key, item.options[e.target.value].value) }}>
                        {
                          item.options.map((child, index) => (
                            <Radio key={index} value={index} disabled={!!child.disabled}>{child.label}</Radio>
                          ))
                        }
                      </Radio.Group>
                    </Form.Item>
                  )
                case 'radio-button':
                  return (
                    <Form.Item className={style["filter-form__item"]} key={item.key} label={item.label}>
                      <Radio.Group className={style["radio-group__wrap"]} buttonStyle="solid" {...item.props} onChange={e => { filterValueChange(item.key, item.options[e.target.value].value) }}>
                        {
                          item.options.map((child, index) => (
                            <Radio.Button key={index} value={index} disabled={!!child.disabled}>{child.label}</Radio.Button>
                          ))
                        }
                      </Radio.Group>
                    </Form.Item>
                  )
                case 'checkbox-group':
                  return (
                    <Form.Item className={style["filter-form__item"]} key={item.key} label={item.label}>
                      {/* <Checkbox
                        indeterminate={this['indeterminate' + index]}
                        onChange={e => { this.handleCheckAllChange(e, item, index) }}
                        checked={this['checkall' + index]}
                      >
                        Check all
                      </Checkbox> */}
                      {/* <Checkbox.Group
                        {...item.props}
                        options={item.options.map(child => ({ ...child, value: child.value[item.key] }))}
                        onChange={e => { filterValueChange(item.key, e) }} /> */}
                      <div ref={(ref) => this.selectRefs[item.key] = ref} className={`${style["select-list_wrap"]} ${expandButtonStatus[item.key] ? style["no-expand"] : ''}`}>
                        <CheckableTag
                          checked={item.props.value.length === item.options.length}
                          onChange={e => { this.handleChangeAll(item, e) }}>全部</CheckableTag>
                        {item.options.map(tag => (
                          <CheckableTag
                            key={tag.value[item.key]}
                            checked={item.props.value.indexOf(tag.value[item.key]) > -1}
                            onChange={e => { this.handleChangeTag(item.props.value, tag.value[item.key], item.key) }}
                          >
                            {tag.label}
                          </CheckableTag>
                        ))}
                        {
                          expandButtonShow[item.key] ? (
                            <Button
                              type="link"
                              className={style["select-button_expand"]}
                              onClick={() => { this.handleExpand(item) }} >
                              {expandButtonStatus[item.key] ? "展开" : "收起"}
                              {expandButtonStatus[item.key] ? <Icon type="down" /> : <Icon type="up" />}
                            </Button>
                          ) : null
                        }
                      </div>
                    </Form.Item>
                  )
                case 'cascader':
                  return (
                    <Form.Item className={style["filter-form__item"]} key={item.key} label={item.label}>
                      <Cascader expandTrigger="hover" {...item.props} options={item.options} onChange={e => { filterValueChange(item.key, e) }} />
                    </Form.Item>
                  )
                default:
                  return null
              }
            })
          }
          {
            filterOpts.length > 0 && searchOpts.length > 0 && (
              <Divider style={{ margin: "8px 0" }} />
            )
          }
          <Row gutter={72}>
            {
              searchOpts.map((item, index) => {
                switch (item.type) {
                  case 'search':
                    // let smallColProps = item.options.length && item.selectprops ? { xxl: 4, xl: 6, lg: 8, md: 10 } : { xxl: 0, xl: 0, lg: 0, md: 0 },
                    //   largeColProps = item.options.length && item.selectprops ? { xxl: 20, xl: 18, lg: 16, md: 14 } : { xxl: 24, xl: 24, lg: 24, md: 24 }
                    return (
                      <Col span={12} key={item.key}>
                        <Form.Item labelCol={{ xxl: 4, sm: 6 }} wrapperCol={{ xxl: 20, sm: 18 }} className={style["filter-form__item_search"]} label={item.label}>
                          <InputGroup compact>
                            <Select
                              style={{ width: '30%' }}
                              placeholder='请选择查询范围'
                              {...item.selectprops}
                              value={searchType}
                              onChange={e => { this.handleSearchSelectChange(e, item) }}
                            >
                              {
                                item.options.map((opt, index) => (<Option key={index} value={index}>{opt.label}</Option>))
                              }
                            </Select>
                            <Search
                              style={{ width: '70%' }}
                              enterButton="查询"
                              placeholder='请输入查询内容'
                              {...item.props}
                              value={searchVal}
                              loading={searchLock}
                              onChange={e => { this.handleSearchInputChange(e, item) }}
                              onSearch={() => {
                                filterValueChange(item.key, {
                                  type: item.options[searchType].value,
                                  value: searchVal
                                })
                              }}
                            />
                          </InputGroup>
                        </Form.Item>
                      </Col>
                    )
                  case 'time-range':
                    return (
                      <Col span={12} key={item.key}>
                        <Form.Item labelCol={{ xxl: 4, sm: 6 }} wrapperCol={{ xxl: 20, sm: 18 }} className={style["filter-form__item_search"]} label={item.label}>
                          <InputGroup compact>
                            <Select
                              style={{ width: '30%' }}
                              {...item.selectprops}
                              value={item.selectValue}
                              onChange={e => {
                                item.onDateTypeChange && item.onDateTypeChange(item.key, e, item.dateType[e].value)
                              }}
                            >
                              {
                                item.dateType.length ? item.dateType.map((opt, index) => {
                                  return (<Option key={index} value={index}>{opt.label}</Option>)
                                }) : null
                              }
                            </Select>
                            <RangePicker
                              style={{ width: '70%' }}
                              ranges={{
                                Today: [moment(), moment()],
                                'This Month': [moment().startOf('month'), moment().endOf('month')],
                              }}
                              onChange={item.onChange}
                              value={item.datePickValue}
                            />
                          </InputGroup>
                        </Form.Item>
                      </Col>
                    )
                  case 'slider-range':
                    let marks = {}
                    let maxLength = 8
                    let currentItem = item.options.find(opt => opt.key === sliderType) || {}
                    if (currentItem.options && currentItem.options instanceof Array) {
                      maxLength = currentItem.options.length
                      currentItem.options.map((opt, index) => {
                        marks[index] = opt.label
                        return opt
                      })
                    }
                    return (
                      <Col span={12} key={item.key}>
                        <Form.Item labelCol={{ xxl: 4, sm: 6 }} wrapperCol={{ xxl: 20, sm: 18 }} className={style["filter-form__item_search"]} label={item.label}>
                          <InputGroup compact>
                            <Select
                              style={{ width: '30%' }}
                              {...item.selectprops}
                              value={sliderType}
                              onChange={e => { this.handleSliderSelectChange(e, item) }}
                            >
                              {
                                item.options.map((opt, index) => (<Option key={index} value={opt.key}>{opt.label}</Option>))
                              }
                            </Select>
                            <Input
                              readOnly
                              style={{ width: '70%', userSelect: 'none', cursor: 'pointer' }}
                              value={sliderInputText}
                              suffix={
                                <Icon type="down" style={{ color: 'rgba(0,0,0,.45)' }} />
                              }
                              onClick={this.handleSliderInputClick}
                            />
                            <Modal
                              visible={sliderModalVisible}
                              getContainer={false}
                              style={{ top: '164px' }}
                              footer={
                                (
                                  <>
                                    <Button onClick={() => { this.handleModalReset(item) }}>重置</Button>
                                    <Button type="primary" onClick={e => {
                                      this.handleModalCancel()
                                      let returnValues = sliderVal.map(val => {
                                        let targetItem = currentItem.options.find((opt, index) => index === val) || {}
                                        return targetItem.value
                                      })
                                      // console.log('debug returnValues', returnValues)
                                      filterValueChange(item.key, {
                                        key: sliderType,
                                        value: returnValues
                                      })
                                    }}>确认</Button>
                                  </>
                                )
                              }
                              closable={false}
                              mask={false}
                              width="800px"
                              bodyStyle={{ padding: '30px 40px' }}
                              onCancel={this.handleModalCancel}
                            >
                              <Slider
                                range
                                max={maxLength}
                                style={{ width: '100%' }}
                                marks={marks}
                                {...item.props}
                                value={sliderVal}
                                tipFormatter={val => {
                                  let targetItem = currentItem.options.find((opt, index) => index === val) || {}
                                  return targetItem.label || val
                                }}
                                step={null}
                                onChange={vals => { this.handleSliderChange(vals, item) }}
                              />
                            </Modal>
                          </InputGroup>
                        </Form.Item>
                      </Col>
                    )
                  default:
                    return null
                }
              })
            }
          </Row>
          {/* <Form.Item label="Range Picker">
            {
              getFieldDecorator('range_picker')(
                <RangePicker locale={locale} />
              )
            }
          </Form.Item> */}
          {/* <Form.Item label="Switch">
            {
              getFieldDecorator('switch', {
                valuePropName: 'checked'
              })(
                <Switch />
              )
            }
          </Form.Item> */}
        </Form>
        <p className={style["filter-button_expand"]} onClick={() => { this.handleExpandFilter() }}>{filterExpand ? <Icon type="down" /> : <Icon type="up" />}</p>
      </section >
    );
  }
}

export default Form.create({ name: 'filter-form' })(TableFilter);