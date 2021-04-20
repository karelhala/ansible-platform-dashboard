import * as React from 'react';

import {
  DataListItem,
  DataListItemRow,
  DataListItemCells,
  DataListCell,
  TextContent,
  Text,
  TextVariants
} from '@patternfly/react-core';

import { Link } from 'react-router-dom';

import { Paths, formatPath } from './paths';
import { NumericLabel } from './numeric-label';
import { contentCounts } from './content-counts';
import { TimeAgo as timeAgo } from '../../helpers/shared/helpers';
import { Logo } from './logo';

export const FeaturedCollection = (collection) => {
  const {
    name,
    // download_count,
    latest_version,
    namespace,
    controls,
    repo
  } = collection;

  const cells = [];

  const company = namespace.company || namespace.name;

  cells.push(
    <DataListCell isFilled={ false } alignRight={ false } key='ns'>
      <Logo
        alt={ company + ' logo' }
        image={ namespace.avatar_url }
        size='50px'
      />
    </DataListCell>
  );

  const contentSummary = contentCounts(
    latest_version.metadata.contents
  );

  cells.push(
    <DataListCell key='content'>
      <div>
        <Link
          to={ formatPath(Paths.collectionByRepo, {
            collection: name,
            namespace: namespace.name,
            repo
          }) }
        >
          { name }
        </Link>
        <TextContent>
          <Text component={ TextVariants.small }>Provided by { company }</Text>
        </TextContent>
      </div>
      <div className='entry'>{ latest_version.metadata.description }</div>
      <div className='entry pf-l-flex pf-m-wrap content'>
        { Object.keys(contentSummary.contents).map(k => (
          <div key={ k }>
            <NumericLabel label={ k } number={ contentSummary.contents[k] } />
          </div>
        )) }
      </div>
    </DataListCell>
  );

  cells.push(
    <DataListCell isFilled={ false } alignRight key='stats'>
      { controls ? <div className='entry'>{ controls }</div> : null }
      <div className='right-col entry'>
            Updated { timeAgo(latest_version.created_at) }
      </div>
      <div className='entry'>v{ latest_version.version }</div>
    </DataListCell>
  );

  return (
    <DataListItem aria-labelledby='featured-collection'>
      <DataListItemRow>
        <DataListItemCells dataListCells={ cells } />
      </DataListItemRow>
    </DataListItem>
  );
};
