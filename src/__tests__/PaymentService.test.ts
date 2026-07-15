import { PaymentService } from "../services/PaymentService";

const mockAccountRepository = {
  lockAccount: jest.fn(),
  getAccountBalance: jest.fn(),
};

const mockPaymentRepository = {
  createLedgerEntries: jest.fn(),
};

const mockClient = {
  query: jest.fn(),
  release: jest.fn(),
};

const mockDatabasePool = {
  connect: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("PaymentService", () => {
  describe("processPayment", () => {
    it("should process a payment successfully", async () => {
      const paymentService = new PaymentService(
        mockAccountRepository as any,
        mockPaymentRepository as any,
        mockDatabasePool as any,
      );

      mockDatabasePool.connect.mockResolvedValue(mockClient);

      mockAccountRepository.lockAccount.mockResolvedValue(undefined);

      mockAccountRepository.getAccountBalance.mockResolvedValue(1000);

      mockPaymentRepository.createLedgerEntries.mockResolvedValue(undefined);

      mockClient.query.mockResolvedValue(undefined);

      await paymentService.processPayment({
        senderAccountId: "sender-account-id",
        receiverAccountId: "receiver-account-id",
        amount: 100,
        currency: "INR",
      });

      expect(mockDatabasePool.connect).toHaveBeenCalledTimes(1);

      expect(mockClient.query).toHaveBeenNthCalledWith(1, "BEGIN");

      expect(mockAccountRepository.lockAccount).toHaveBeenCalledWith(
        mockClient,
        "sender-account-id",
      );

      expect(mockAccountRepository.getAccountBalance).toHaveBeenCalledWith(
        mockClient,
        "sender-account-id",
      );

      expect(mockPaymentRepository.createLedgerEntries).toHaveBeenCalledWith(
        mockClient,
        expect.any(String),
        "sender-account-id",
        "receiver-account-id",
        100,
        "INR",
      );

      expect(mockClient.query).toHaveBeenNthCalledWith(2, "COMMIT");

      expect(mockClient.release).toHaveBeenCalledTimes(1);
    });
  });
});
