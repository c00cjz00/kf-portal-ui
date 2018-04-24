import React from 'react';
import { compose } from 'recompose';
import { Trans } from 'react-i18next';
import { withTheme } from 'emotion-theming';
import { css } from 'react-emotion';
import { injectState } from 'freactal';

import { MatchBox } from '@arranger/components/dist/Arranger';
import graphql from 'services/arranger';
import { ModalFooter } from './Modal';

const UploadButton = withTheme(({ theme, ...props }) => (
  <button className={theme.actionButton} {...props} />
));

const enhance = compose(withTheme, injectState);

const UploadIdsModal = ({ api, theme, state: { loggedInUser }, setSQON, closeModal, ...props }) => (
  <div>
    <MatchBox
      {...{ ...props, setSQON }}
      instructionText={
        'Type or copy-and-paste a list of comma delimited identifiers, or choose a file of identifiers to upload'
      }
      placeholderText={`e.g. File Id\ne.g. Sample Id\ne.g. Participant Id`}
      entitySelectText={'Select the entity to upload'}
      entitySelectPlaceholder={'Select an Entity'}
      matchedTabTitle={'Matched'}
      unmatchedTabTitle={'Unmatched'}
      matchTableColumnHeaders={{
        inputId: 'Input Id',
        matchedEntity: 'Matched Entity',
        entityId: 'Entity Id',
      }}
      browseButtonText={<Trans>Browse</Trans>}
      matchHeaderText={
        <span
          className={css`
            ${theme.modalTitle};
          `}
        >
          <Trans>Matching files in the Kids First Data Repository</Trans>
        </span>
      }
      ButtonComponent={UploadButton}
    >
      {({ hasResults, saveSet }) => (
        <ModalFooter
          {...{
            handleSubmit: async () => {
              await saveSet({
                userId: loggedInUser.egoId,
                api: graphql(api),
                dataPath: 'data.saveSet',
              });
              closeModal();
            },
            submitText: 'Upload',
            submitDisabled: !hasResults,
          }}
        />
      )}
    </MatchBox>
  </div>
);

export default enhance(UploadIdsModal);
