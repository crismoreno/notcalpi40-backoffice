import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import {
  clearTags,
  clearCodingLangs,
  clearMadeAts,
} from '../actions/categories';

import {
  fetchTags,
  fetchCodingLangs,
  fetchMadeAts,
} from '../helpers/GET/getCategories';
import { PlusOutlined } from '@ant-design/icons';

import { getTags, getCodingLangs, getMadeAts } from '../reducers/index';
import CategoryDrawer from '../components/Drawer/CategoryDrawer.jsx';

import { CategoryCard } from '../components/CategoryCard.jsx';

import { Button, PageHeader } from 'antd';

const Category = ({
  dispatch,
  tags,
  madeAts,
  codingLangs,
  match: {
    params: { cat },
  },
}) => {
  useEffect(() => {
    switch (cat) {
      case 'tags':
        dispatch(clearCodingLangs());
        dispatch(clearMadeAts());
        dispatch(fetchTags());
        break;
      case 'codingLangs':
        dispatch(clearTags());
        dispatch(clearMadeAts());
        dispatch(fetchCodingLangs());
        break;
      case 'madeAts':
        dispatch(clearTags());
        dispatch(clearCodingLangs());
        dispatch(fetchMadeAts());
        break;
      case 'default':
        return null;
    }
  }, [cat]);

  let entity = eval(cat);

  // console.log(cat, 'cat', entity);

  const [showDrawer, setShowDrawer] = useState(false);
  const [drawerProps, setDrawerProps] = useState(null);

  useEffect(() => {
    if (drawerProps != null) {
      setShowDrawer(true);
    }
  }, [drawerProps]);

  const handleShowDrawer = ({
    entityType,
    entityId,
    entityName,
    entityFullName,
    priority,
  }) => {
    setDrawerProps({
      dispatch,
      entityType,
      entityId,
      entityName,
      entityFullName,
      priority,
    });
  };

  const handleHideDrawer = () => {
    setShowDrawer(false);
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <PageHeader
          className="contact-forms-page-header"
          title={`Check ${cat}`}
          // subTitle="This is a subtitle"
        />
        <Button
          type="primary"
          style={{ marginTop: '15px' }}
          onClick={() => {
            handleShowDrawer({
              entityType: cat.substring(0, cat.length - 1),
              entityId: null,
              entityName: null,
              entityFullName: null,
              priority: null,
            });
          }}
        >
          <PlusOutlined />
          {`Add new ${cat.substring(0, cat.length - 1)}`}
        </Button>
        <CategoryDrawer
          visibility={showDrawer}
          onClose={handleHideDrawer}
          {...drawerProps}
        />
      </div>
      <div className="project-cards-container">
        {entity.map((entity, index) => (
          <CategoryCard
            key={index}
            entity={entity}
            entityType={cat.substring(0, cat.length - 1)}
            dispatch={dispatch}
            onClickEdit={() => {
              handleShowDrawer({
                entityType: cat.substring(0, cat.length - 1),
                entityId: entity.id,
                entityName: entity.name || entity.short_name,
                entityFullName: entity.full_name || null,
                priority: entity.orderby || null,
              });
            }}
          />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  tags: getTags(state),
  codingLangs: getCodingLangs(state),
  madeAts: getMadeAts(state),
});

export default connect(mapStateToProps)(Category);
