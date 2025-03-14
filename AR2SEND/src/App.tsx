import React, { useState } from 'react';
import { Upload, Send, StopCircle, Trash2, Settings, Download, Eye, AlertCircle, Phone } from 'lucide-react';

interface SendStatus {
  total: number;
  sent: number;
  success: number;
  failed: number;
}

function App() {
  const [status, setStatus] = useState<'waiting' | 'sending' | 'complete'>('waiting');
  const [sendStatus, setSendStatus] = useState<SendStatus>({
    total: 0,
    sent: 0,
    success: 0,
    failed: 0
  });
  const [messageTemplate, setMessageTemplate] = useState('');
  const [delay, setDelay] = useState(2);
  const [logs, setLogs] = useState<Array<{ message: string; type: 'success' | 'error' | 'info' }>>([]);
  const [whatsappNumber, setWhatsappNumber] = useState('');

  const handleFileUpload = () => {
    setSendStatus(prev => ({ ...prev, total: 100 }));
    addLog('تم تحميل ملف إكسل بنجاح', 'success');
  };

  const addLog = (message: string, type: 'success' | 'error' | 'info') => {
    setLogs(prev => [...prev, { message, type }]);
  };

  const startSending = () => {
    if (!whatsappNumber) {
      addLog('الرجاء إدخال رقم الواتساب الخاص بك', 'error');
      return;
    }
    setStatus('sending');
    addLog('بدأ إرسال الرسائل', 'info');
  };

  const stopSending = () => {
    setStatus('waiting');
    addLog('تم إيقاف عملية الإرسال', 'info');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <header className="bg-white rounded-lg shadow-sm p-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">برنامج إرسال الواتساب</h1>
            <span className="text-sm text-gray-500">الإصدار 1.0.0</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
              status === 'waiting' ? 'bg-gray-100 text-gray-700' :
              status === 'sending' ? 'bg-blue-100 text-blue-700' :
              'bg-green-100 text-green-700'
            }`}>
              {status === 'waiting' ? 'في الانتظار' : 
               status === 'sending' ? 'جاري الإرسال' : 'مكتمل'}
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Excel File Section */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">ملف إكسل</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <button
                  onClick={handleFileUpload}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <Upload className="w-4 h-4 ml-2" />
                  تحميل ملف إكسل
                </button>
                <p className="mt-2 text-sm text-gray-500">يدعم صيغ xls و xlsx</p>
              </div>
              {sendStatus.total > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-600">إجمالي الصفوف: {sendStatus.total}</p>
                  <p className="text-sm text-gray-600">الأعمدة المحددة: الاسم، المبلغ، رقم الهاتف</p>
                  <div className="flex items-center">
                    <AlertCircle className="w-4 h-4 ml-2" />
                    <span className="text-sm text-green-600">تم التحقق من صحة البيانات بنجاح</span>
                  </div>
                </div>
              )}
            </section>

            {/* Message Template Section */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">قالب الرسالة</h2>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50">عريض</button>
                  <button className="px-3 py-1 text-sm border rounded hover:bg-gray-50 mr-2">مائل</button>
                </div>
                <textarea
                  value={messageTemplate}
                  onChange={(e) => setMessageTemplate(e.target.value)}
                  className="w-full h-40 p-3 border rounded-md"
                  placeholder="أدخل قالب رسالتك هنا. استخدم {name}، {amount}، {phone} كمتغيرات."
                />
                <button className="inline-flex items-center px-4 py-2 text-sm border rounded-md hover:bg-gray-50">
                  <Eye className="w-4 h-4 ml-2" />
                  معاينة القالب
                </button>
              </div>
            </section>
          </div>

          {/* Left Column */}
          <div className="space-y-6">
            {/* WhatsApp Settings */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">إعدادات الواتساب</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">رقم الواتساب الخاص بك</label>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 ml-2" />
                    <input
                      type="tel"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      placeholder="مثال: 966500000000"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">أدخل رقم الواتساب مع رمز الدولة بدون +</p>
                </div>
              </div>
            </section>

            {/* Control Panel */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">لوحة التحكم</h2>
              <div className="space-y-3">
                <button
                  onClick={startSending}
                  disabled={status === 'sending'}
                  className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center justify-center"
                >
                  <Send className="w-4 h-4 ml-2" />
                  بدء الإرسال
                </button>
                <button
                  onClick={stopSending}
                  disabled={status !== 'sending'}
                  className="w-full py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 flex items-center justify-center"
                >
                  <StopCircle className="w-4 h-4 ml-2" />
                  إيقاف
                </button>
                <button
                  onClick={() => setLogs([])}
                  className="w-full py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 flex items-center justify-center"
                >
                  <Trash2 className="w-4 h-4 ml-2" />
                  مسح السجلات
                </button>
              </div>

              {/* Progress */}
              <div className="mt-4 space-y-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(sendStatus.sent / sendStatus.total) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>تم الإرسال: {sendStatus.sent}/{sendStatus.total}</span>
                  <span>ناجح: {sendStatus.success}</span>
                  <span>فاشل: {sendStatus.failed}</span>
                </div>
              </div>
            </section>

            {/* Settings Panel */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">الإعدادات</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">التأخير بين الرسائل (ثواني)</label>
                  <input
                    type="number"
                    value={delay}
                    onChange={(e) => setDelay(Number(e.target.value))}
                    min="1"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">حالة الواتساب</span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-green-100 text-green-700">
                    متصل
                  </span>
                </div>
              </div>
            </section>

            {/* Export Options */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">تصدير</h2>
              <button className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center">
                <Download className="w-4 h-4 ml-2" />
                تصدير التقرير
              </button>
            </section>
          </div>
        </div>

        {/* Status Display */}
        <section className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">سجل الحالة</h2>
          <div className="h-40 overflow-y-auto space-y-2">
            {logs.map((log, index) => (
              <div
                key={index}
                className={`p-2 rounded text-sm ${
                  log.type === 'success' ? 'bg-green-50 text-green-700' :
                  log.type === 'error' ? 'bg-red-50 text-red-700' :
                  'bg-gray-50 text-gray-700'
                }`}
              >
                {log.message}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;