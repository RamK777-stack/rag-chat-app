import Chat from './components/Chat';

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">CHAT WITH YOUR CSV FILE</h1>
      <div className="mt-8">
        <Chat />
      </div>
    </div>
  );
}
