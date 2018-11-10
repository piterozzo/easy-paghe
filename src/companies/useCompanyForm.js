import { useState, useEffect } from 'react';
import http from './http';
import Axios from 'axios';

function useCompanyForm({ defaultName, defaultAddress, defaultPhone }, onCreate, onUpdate) {
	const [isSaving, setIsSaving] = useState(false);
	const [id, setId] = useState(0);
	const [name, setName] = useState(defaultName || '');
	const [address, setAddress] = useState(defaultAddress || '');
	const [phone, setPhone] = useState(defaultPhone || '');
	const [employees, setEmployees] = useState([]);

	const setForm = (form) => {
		setId(form.id);
		setName(form.name);
		setAddress(form.address);
		setPhone(form.phone);
	};

	const createNewCompany = ({ name, address, phone }) => {
		const { promise, tokenSource } = http.createCompany({ name, address, phone });
		promise
			.then((response) => {
				setIsSaving(false);
				setId(response.data.id);
				onCreate && onCreate(response.data);
			})
			.catch((error) => {
				if (!Axios.isCancel(error)) {
					setIsSaving(false);
				}
			});

		return function cleanup() {
			if (isSaving) tokenSource.cancel();
		};
	};

	const updateCompany = ({ id, name, address, phone }) => {
		const { promise, tokenSource } = http.updateCompany(id, { name, address, phone });
		promise
			.then(() => {
				setIsSaving(false);
				onUpdate && onUpdate();
			})
			.catch((error) => {
				if (!Axios.isCancel(error)) {
					setIsSaving(false);
				}
			});

		return function cleanup() {
			if (isSaving) tokenSource.cancel();
		};
	};

	useEffect(
		() => {
			if (isSaving) {
				if (id === 0) {
					return createNewCompany({ name, address, phone });
				} else {
					return updateCompany({ id, name, address, phone });
				}
			}
		},
		[isSaving],
	);

	return {
		id,
		name,
		address,
		phone,
		employees,
		isSaving,
		setIsSaving,
		setId,
		setName,
		setAddress,
		setPhone,
		setEmployees,
		setForm,
	};
}

export default useCompanyForm;
