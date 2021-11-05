import React from 'react';
import DefaultTemplate from '../../templates/default';
import SettingsForm from '../../organisms/settings-form';

export default function SettingsPage(): JSX.Element {
  return (
    <DefaultTemplate pageTitle="Configurações de busca">
      <SettingsForm />
    </DefaultTemplate>
  );
}
