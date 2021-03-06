import React from 'react';
import EventBus from 'eventbusjs';
import PersonDetails from './PersonDetails';
import usePersonForm from './usePersonForm';
import Page from '../common/Page';
import buildStepMap from './stepsMap';
import PersonSummary from './PersonSummary';
import SimpleStepper from '../common/SimpleStepper';

function AddPerson({ history }) {
	const onCreate = ({ id }) => {
		history.push(`/index/people/${id}`);
		EventBus.dispatch('global-notification-show', undefined, { message: 'Persona creata' });
	};

	const { isSaving, setIsSaving, person, updateField, previousStep, activeStep, steps, next, prev, moveToStep, errors } = usePersonForm({
		onSave: onCreate,
	});

	const save = () => {
		setIsSaving(true);
	};

	const personDetails = <PersonDetails person={person} updateField={updateField} isSaving={isSaving} errors={errors} />
	const personSummary = <PersonSummary person={person} moveToStep={moveToStep} errors={errors} />

	const stepMap = buildStepMap(personDetails, personSummary);

	return (
		<Page title="Aggiungi Persona" noPaper>
			<SimpleStepper previousStep={previousStep} activeStep={activeStep} steps={steps} stepMap={stepMap} next={next} prev={prev} save={save} isLoading={isSaving} />
		</Page>
	);
}

export default AddPerson;
