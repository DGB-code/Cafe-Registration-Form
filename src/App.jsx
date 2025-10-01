import { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    payment: '',
    gender: 'male',
    terms: false,
    comments: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords don't match";
    if (!formData.terms) newErrors.terms = 'You must agree to terms';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Form Data:', formData); // Replace with API submission, e.g., fetch('/api/register', { method: 'POST', body: JSON.stringify(formData) })
      alert('Registration successful! Welcome aboard.');
      setFormData({ name: '', email: '', password: '', confirmPassword: '', phone: '', payment: '', gender: '', terms: false, comments: '' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cafe-beige to-slate-200 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md transform hover:-translate-y-1 transition-transform duration-300">
        <h1 className="text-3xl font-bold text-center text-cafe-brown mb-2">Cafe Registration</h1>
        <p className="text-center text-gray-600 mb-8">Join our platform for exclusive deals and easy ordering!</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Max Johnson"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-brown focus:border-transparent ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@example.com"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-brown focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 8 characters"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-brown focus:border-transparent ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Match password above"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-brown focus:border-transparent ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
              required
            />
            {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
          </div>

          {/* Phone (Optional) */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number (Optional)</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+993 61 234567"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-brown focus:border-transparent"
            />
          </div>

          {/* Payment Method */}
          <div>
            <label htmlFor="payment" className="block text-sm font-medium text-gray-700 mb-2">Preferred Payment Method</label>
            <select
              id="payment"
              name="payment"
              value={formData.payment}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-brown focus:border-transparent"
            >
              <option value="">Select one</option>
              <option value="card">Credit/Debit Card</option>
              <option value="cash">Cash on Delivery</option>
              <option value="balance">Account Balance</option>
            </select>
          </div>

          {/* Gender */}
          <fieldset className="space-y-2">
            <legend className="text-sm font-medium text-gray-700">Gender (Optional)</legend>
            <div className="flex flex-col space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === 'male'}
                  onChange={handleChange}
                  className="mr-2 text-cafe-brown focus:ring-cafe-brown"
                  
                />
                Male
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === 'female'}
                  onChange={handleChange}
                  className="mr-2 text-cafe-brown focus:ring-cafe-brown"
                />
                Female
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={formData.gender === 'other'}
                  onChange={handleChange}
                  className="mr-2 text-cafe-brown focus:ring-cafe-brown"
                />
                Other/Prefer not to say
              </label>
            </div>
          </fieldset>

          {/* Terms */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
              className="h-4 w-4 text-cafe-brown focus:ring-cafe-brown border-gray-300 rounded"
              required
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              I agree to the <a href="#" className="text-cafe-brown hover:underline">Terms and Conditions</a>
            </label>
          </div>
          {errors.terms && <p className="mt-1 text-sm text-red-600">{errors.terms}</p>}

          {/* Comments */}
          <div>
            <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-2">Any Comments?</label>
            <textarea
              id="comments"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              placeholder="Tell us about your favorite cafe drink..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cafe-brown focus:border-transparent resize-vertical"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-cafe-brown text-white py-3 px-4 rounded-lg font-semibold hover:bg-sienna transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cafe-brown focus:ring-offset-2"
          >
            Register Now
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;