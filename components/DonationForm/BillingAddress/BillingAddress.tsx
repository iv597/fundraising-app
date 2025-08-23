type FormData = {
    addressLine1: string;
    addressLine2: string;
    country: string;
    city: string;
    state: string;
    zip: string;
};

type Props = {
    formData: FormData;
    onInputChange: (field: string, value: string) => void;
};

export default function BillingAddress({ formData, onInputChange }: Props) {
    return (
        <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Billing address</h3>

            <div className="space-y-3">
                <input
                    type="text"
                    placeholder="Address Line 1"
                    value={formData.addressLine1}
                    onChange={(e) =>
                        onInputChange("addressLine1", e.target.value)
                    }
                    className="input input-bordered w-full"
                />

                <input
                    type="text"
                    placeholder="Address Line 2"
                    value={formData.addressLine2}
                    onChange={(e) =>
                        onInputChange("addressLine2", e.target.value)
                    }
                    className="input input-bordered w-full"
                />

                <div className="grid grid-cols-2 gap-3">
                    <select
                        value={formData.country}
                        onChange={(e) =>
                            onInputChange("country", e.target.value)
                        }
                        className="select select-bordered"
                    >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>United Kingdom</option>
                        <option>Other</option>
                    </select>

                    <input
                        type="text"
                        placeholder="ZIP"
                        value={formData.zip}
                        onChange={(e) => onInputChange("zip", e.target.value)}
                        className="input input-bordered"
                    />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <input
                        type="text"
                        placeholder="City"
                        value={formData.city}
                        onChange={(e) => onInputChange("city", e.target.value)}
                        className="input input-bordered"
                    />

                    <input
                        type="text"
                        placeholder="State"
                        value={formData.state}
                        onChange={(e) => onInputChange("state", e.target.value)}
                        className="input input-bordered"
                    />
                </div>
            </div>
        </div>
    );
}
