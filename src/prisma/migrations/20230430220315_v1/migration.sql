-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "cinNumber" TEXT NOT NULL,
    "iceNumber" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "CustomerNumber" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "ifNumber" TEXT NOT NULL,
    "iceNumber" TEXT NOT NULL,
    "tpNumber" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "bank" TEXT NOT NULL,
    "rib" TEXT NOT NULL,
    "logoUrl" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "CompanyNumber" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "paymentDay" TIMESTAMP(3),
    "total" DOUBLE PRECISION NOT NULL,
    "customerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoiceItem" (
    "id" TEXT NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "invoiceItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product" (
    "id" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CRM" (
    "id" SERIAL NOT NULL,
    "customer" TEXT NOT NULL,
    "interaction" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "user" TEXT NOT NULL,

    CONSTRAINT "CRM_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "customer_id_key" ON "customer"("id");

-- CreateIndex
CREATE UNIQUE INDEX "customer_CustomerNumber_key" ON "customer"("CustomerNumber");

-- CreateIndex
CREATE UNIQUE INDEX "company_id_key" ON "company"("id");

-- CreateIndex
CREATE UNIQUE INDEX "company_invoiceId_key" ON "company"("invoiceId");

-- CreateIndex
CREATE UNIQUE INDEX "company_CompanyNumber_key" ON "company"("CompanyNumber");

-- CreateIndex
CREATE UNIQUE INDEX "order_id_key" ON "order"("id");

-- CreateIndex
CREATE UNIQUE INDEX "invoice_id_key" ON "invoice"("id");

-- CreateIndex
CREATE UNIQUE INDEX "invoice_number_key" ON "invoice"("number");

-- CreateIndex
CREATE UNIQUE INDEX "invoiceItem_id_key" ON "invoiceItem"("id");

-- CreateIndex
CREATE UNIQUE INDEX "product_id_key" ON "product"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CRM_id_key" ON "CRM"("id");

-- AddForeignKey
ALTER TABLE "company" ADD CONSTRAINT "company_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoiceItem" ADD CONSTRAINT "invoiceItem_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
